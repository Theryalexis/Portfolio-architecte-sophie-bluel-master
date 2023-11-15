const container_image = document.querySelector(".file_icon");
const container_upload = document.querySelector(".button_file");
const container_info = document.querySelector("#img_info");
const preview_images = document.querySelector("#img_project");

// fonction pour la preview de l'image charger
function handleFiles(files) {
  var imageType = /^image\//;
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    if (!imageType.test(file.type)) {
      alert("veuillez sélectionner une image");
    } else {
      if (i == 0) {
        preview.innerHTML = "";
      }
      var img = document.createElement("img");
      img.classList.add("obj");
      img.file = file;
      preview.appendChild(img);
      var reader = new FileReader();
      reader.onload = (function (aImg) {
        return function (e) {
          aImg.src = e.target.result;
        };
      })(img);

      reader.readAsDataURL(file);
      container_image.classList.add("display_none");
      container_upload.classList.add("display_none");
      container_info.classList.add("display_none");
      preview_images.classList.remove("#img_project");
      preview_images.classList.add("#preview");
    }
  }
}
const btnAjouterProjet = document.querySelector("#submit_Project");
btnAjouterProjet.addEventListener("click", addWork);

// fonction pour ajouter un projet
async function addWork(event) {
  event.preventDefault();

  const title = document.querySelector(".input_style").value;
  const categoryId = document.querySelector("#liste-categories").value;
  const image = document.querySelector("#img_project").files[0];

  if (title === "" || categoryId === "" || image === undefined) {
    alert("Merci de remplir tous les champs");
    return;
  } else if (categoryId !== "1" && categoryId !== "2" && categoryId !== "3") {
    alert("Merci de choisir une catégorie valide");
    return;
  } else {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", categoryId);
      formData.append("image", image);

      const response = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.status === 201) {
        alert("Projet ajouté avec succès");
        generationProjetsmodale();
        fermeture_modale2();
        generationProjets(data, null);
      } else if (response.status === 400) {
        alert("Merci de remplir tous les champs");
      } else if (response.status === 500) {
        alert("Erreur serveur");
      } else if (response.status === 401) {
        alert("Vous n'êtes pas autorisé à ajouter un projet");
        window.location.href = "login.html";
      }
    } catch (error) {
      console.log(error);
    }
  }
}
