const token = sessionStorage.getItem("token");
const editorblack = document.querySelector(".editor-black");
const button_modifier = document.querySelector(".button-modifier");
const button_editor = document.getElementById("button_editor");
const modale1 = document.querySelector(".container_modale1");
const modale1_fermer = document.querySelector(".modale1_cross");
let loginout;

function logout() {
  sessionStorage.removeItem("token"); // on supprime le token du sessionStorage//
  editorblack.classList.add("display_none");
}
document.body.onload = async function () {
  let loginout = document.getElementById("logout-nav");
  editorblack.classList.add("display_none");
  button_modifier.classList.add("display_none");

  if (token) {
    editorblack.classList.remove("display_none"); // On retire le display none au bandeau noir pour le rendre visible //
    loginout.innerText = "logout";
    loginout.addEventListener("click", logout);
    button_modifier.classList.remove("display_none"); // On enlève le display none au bouton modifier pour le rendre visible //
    loginout.setAttribute("href", "./index.html");
    button_editor.addEventListener("click", display_modale1);
    modale1_fermer.addEventListener("click", fermeture_modale1);
  }
};
//fonction pour afficher la modale 1
function display_modale1() {
  modale1.classList.remove("display_none");
}
//Fonction pour fermet la modale 1
function fermeture_modale1() {
  modale1.classList.add("display_none");
}
