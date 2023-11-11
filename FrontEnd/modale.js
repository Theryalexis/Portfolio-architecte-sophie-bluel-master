const token = sessionStorage.getItem("token");
const editorblack = document.querySelector(".editor-black");
const button_modifier = document.querySelector(".button-modifier");
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
  }
};
