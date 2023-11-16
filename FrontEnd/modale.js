const token = sessionStorage.getItem("token");
const editorblack = document.querySelector(".editor-black");
const button_modifier = document.querySelector(".button-modifier");
const button_editor = document.getElementById("button_editor");
const modale1 = document.querySelector(".container_modale1");
const modale1_fermer = document.querySelector(".modale1_cross");
const modale1_ajouter = document.querySelector(".modale1_button");
const modale2 = document.querySelector(".container_modale2");
const modale2_fleche = document.querySelector(".modale2_arrow");
const modale2_fermer = document.querySelector(".modale2_cross");
const divfilter = document.querySelector(".filters");
const modale1gallery = document.querySelector(".modale1_gallery");
let loginout;

function logout() {
  sessionStorage.removeItem("token");
  editorblack.classList.add("display_none");
}
document.body.onload = async function () {
  let loginout = document.getElementById("logout-nav");
  editorblack.classList.add("display_none");
  button_modifier.classList.add("display_none");

  if (token) {
    divfilter.classList.add("display_none");
    editorblack.classList.remove("display_none");
    loginout.innerText = "logout";
    loginout.addEventListener("click", logout);
    button_modifier.classList.remove("display_none");
    loginout.setAttribute("href", "./index.html");
    button_editor.addEventListener("click", display_modale1);
    modale1_fermer.addEventListener("click", fermeture_modale1);
    modale1_ajouter.addEventListener("click", display_modale2);
    modale2_fleche.addEventListener("click", return_modale1);
    modale2_fermer.addEventListener("click", fermeture_modale2);

    generationProjets(data, null);
    modale1.addEventListener("click", clickdehorsModale);
    modale2.addEventListener("click", clickdehorsModale);
  }
};
//fonction pour afficher la modale 1
async function display_modale1() {
  modale1.classList.remove("display_none");
  generationProjetsmodale();
}
//Fonction pour fermer la modale 1
function fermeture_modale1() {
  modale1.classList.add("display_none");
  modale1gallery.innerHTML = "";
}
//fonction qui ouvre la modale2
function display_modale2() {
  modale1.classList.add("display_none");
  modale2.classList.remove("display_none");
}
//fonction pour retourner de la modale 2 à la 1
function return_modale1() {
  modale2.classList.add("display_none");
  display_modale1();
  modale1gallery.innerHTML = "";
}
//fonction pour fermer la modale 2
function fermeture_modale2() {
  modale2.classList.add("display_none");
  modale1gallery.innerHTML = "";
}
//fonction pour fermer les modale en dehors du cadre
async function clickdehorsModale(event) {
  if (event.target === modale1) {
    fermeture_modale1();
  }
  if (event.target === modale2) {
    fermeture_modale2();
  }
}
