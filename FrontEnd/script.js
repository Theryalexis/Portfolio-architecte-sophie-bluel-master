const btnfilters = document.querySelector(".filters");
const sectionProjets = document.querySelector(".gallery");
const gallery_modale = document.querySelector(".modale1_gallery");

// Reset la section projets
function resetSectionProjets() {
  sectionProjets.innerHTML = "";
}

/*-----------------------------------*/

async function generationProjetsmodale(data) {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    data = await response.json();
  } catch {
    const p = document.createElement("p");
    p.classList.add("error");
    p.innerHTML =
      "Une erreur est survenue lors de la récupération des projets<br><br>Si le problème persiste, veuillez contacter l'administrateur du site";
    gallery_modale.appendChild(p);
  }
  // Génère les projets
  if (token) {
    for (let i = 0; i < data.length; i++) {
      const figure = document.createElement("figure");
      gallery_modale.appendChild(figure);
      const img = document.createElement("img");
      img.src = data[i].imageUrl;
      img.alt = data[i].title;
      figure.appendChild(img);
      figure.classList.add("gallerymodale_image");
      const trashCan = document.createElement("i");
      figure.appendChild(trashCan);
      trashCan.classList.add("trashcan", "fa-regular", "fa-trash-can");
      trashCan.addEventListener("click", trashcanClicked);
      trashCan.dataset.dataid = data[i].id;
    }
  }
}
//Fonction pour supprimer une images avec la requete api
async function deletework(dataid) {
  await fetch("http://localhost:5678/api/works/" + dataid, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
//fonction qui agit au click sur le trashcan
async function trashcanClicked(event) {
  const dataid = event.target.dataset.dataid;
  const galleryStep1 = document.querySelector(".modale1_gallery");
  await deletework(dataid);
  galleryStep1.innerHTML = "";
  generationProjetsmodale();
  generationProjets(data, null);
}
//fonction qui gere l'affichage des bouton via l'api
async function getcategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  let categories = await response.json();
  const bouttonfiltre = document.querySelector(".filters");
  let nbCategories = categories.length;

  // Ajouter le bouton "Tous"
  const btnTous = document.createElement("button");
  btnTous.classList.add("filter__btn", "all", "filter__btn--active"); // Ajoutez la classe "filter__btn--active" ici
  btnTous.innerHTML = "Tous";
  bouttonfiltre.appendChild(btnTous);

  for (let i = 0; i < nbCategories; i++) {
    const btnfiltres = document.createElement("button");
    btnfiltres.classList.add("filter__btn");
    btnfiltres.innerHTML = categories[i].name;
    bouttonfiltre.appendChild(btnfiltres);
    bouttonfiltre.addEventListener("click", buttonClicked);
  }

  bouttonfiltre.addEventListener("click", function (event) {
    const buttons = document.querySelectorAll(".filter__btn");
    buttons.forEach((button) => {
      button.classList.remove("filter__btn--active");
    });

    if (event.target.classList.contains("filter__btn")) {
      event.target.classList.add("filter__btn--active");
      buttonClicked(event.target.innerHTML);
    } else if (event.target.classList.contains("all")) {
      // Gérer le clic sur le bouton "Tous"
      event.target.classList.add("filter__btn--active");
    }
  });
}

getcategories();

//fonction qui affiche les projets via les filtres
function buttonClicked(event) {
  let worksFiltered = works.filter(function (work) {
    if (event.target.innerText === "Tous") {
      return true;
    }
    return work.category.name === event.target.innerText;
  });
  createProjectsCards(worksFiltered);
}

function createProjectsCards(worksFiltered) {
  const gallery = document.querySelector(".gallery");
  let nbProjects = worksFiltered.length;
  resetSectionProjets();
  for (let i = 0; i < nbProjects; i++) {
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    image.setAttribute("src", worksFiltered[i].imageUrl);
    image.setAttribute("alt", worksFiltered[i].title);
    figcaption.innerHTML = worksFiltered[i].title;
    figure.appendChild(image);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  }
}
async function createProjects() {
  await getWorks();
  createProjectsCards(works);
}
async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  works = await response.json();
}
createProjects();
