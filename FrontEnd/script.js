const btnAll = document.querySelector(".filter__btn-id-null");
const btnId1 = document.querySelector(".filter__btn-id-1");
const btnId2 = document.querySelector(".filter__btn-id-2");
const btnId3 = document.querySelector(".filter__btn-id-3");

const sectionProjets = document.querySelector(".gallery");
const gallery_modale = document.querySelector(".modale1_gallery");

let data = null;
let id;
generationProjets(data, null);

// Reset la section projets
function resetSectionProjets() {
  sectionProjets.innerHTML = "";
}

// Génère les projets
async function generationProjets(data, id) {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    data = await response.json();
  } catch {
    const p = document.createElement("p");
    p.classList.add("error");
    p.innerHTML =
      "Une erreur est survenue lors de la récupération des projets<br><br>Une tentative de reconnexion automatique auras lieu dans une minute<br><br><br><br>Si le problème persiste, veuillez contacter l'administrateur du site";
    sectionProjets.appendChild(p);
    await new Promise((resolve) => setTimeout(resolve, 60000));
    window.location.href = "index.html";
  }

  resetSectionProjets();

  // Filtre les résultats
  if ([1, 2, 3].includes(id)) {
    data = data.filter((data) => data.categoryId == id);
  }

  // Change la couleur du bouton en fonction du filtre
  document.querySelectorAll(".filter__btn").forEach((btn) => {
    btn.classList.remove("filter__btn--active");
  });
  document
    .querySelector(`.filter__btn-id-${id}`)
    .classList.add("filter__btn--active");

  if (data.length === 0 || data === undefined) {
    const p = document.createElement("p");
    p.classList.add("error");
    p.innerHTML =
      "Aucun projet à afficher <br><br>Toutes nos excuses pour la gêne occasionnée";
    sectionProjets.appendChild(p);
    return;
  }

  // Génère les projets
  if (id === null || [1, 2, 3].includes(id)) {
    for (let i = 0; i < data.length; i++) {
      const figure = document.createElement("figure");
      sectionProjets.appendChild(figure);
      const img = document.createElement("img");
      img.src = data[i].imageUrl;
      img.alt = data[i].title;
      figure.appendChild(img);

      const figcaption = document.createElement("figcaption");
      figcaption.innerHTML = data[i].title;
      figure.appendChild(figcaption);
    }
  }
}

// >>> FILTRES

btnAll.addEventListener("click", () => {
  // Tous les projets
  generationProjets(data, null);
});

btnId1.addEventListener("click", () => {
  // Objets
  generationProjets(data, 1);
});

btnId2.addEventListener("click", () => {
  // Appartements
  generationProjets(data, 2);
});

btnId3.addEventListener("click", () => {
  // Hôtels & restaurants
  generationProjets(data, 3);
});

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
