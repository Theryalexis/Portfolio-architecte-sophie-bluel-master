let btnconnection = document.querySelector("login-button");

async function login() {
  let emailinput = document.getElementById("email").value;
  let passwordinput = document.getElementById("password").value;
  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailinput,
        password: passwordinput,
      }),
    });

    if (response.status !== 200) {
      throw new Error("Le login ou le mot de passe est incorrect");
    }

    const responseJson = await response.json();
    sessionStorage.setItem("token", responseJson.token);
    window.location.assign("index.html");
  } catch (erreur) {
    const errorMessage = document.querySelector(".error_message");
    errorMessage.innerHTML = erreur.message;
    errorMessage.classList.remove("display_none");
  }
}

document.body.onload = function () {
  let loginFormulaire = document.getElementById("login-button");
  loginFormulaire.addEventListener("click", login());
};