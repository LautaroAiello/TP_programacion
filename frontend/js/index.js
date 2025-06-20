
function login(){
    document.getElementById("login").style.display = "flex";
}
function exit(){
    document.getElementById("login").style.display = "none";
}
function registro(){
    document.getElementById("login").style.display = "none";
    document.getElementById("registro").style.display = "flex";
}

function exitRe(){
    document.getElementById("registro").style.display = "none";
}

const card = document.querySelectorAll(".card");
card.forEach(c => {
    c.addEventListener("click", () => {
        window.location.href = 'producto.html';
    })
});

function darkMode() {
  document.body.classList.toggle("modo-oscuro");

  // Guardar en localStorage
  const esOscuro = document.body.classList.contains("modo-oscuro");
  localStorage.setItem("tema", esOscuro ? "oscuro" : "claro");
}

// Cargar preferencia al iniciar
window.onload = () => {
  if (localStorage.getItem("tema") === "oscuro") {
    document.body.classList.add("modo-oscuro");
  }
}

function perfilUsuario(){
  window.location.href = 'datosUsuario.html';
}

function modificarDatosUsuario(){
  let datos = document.querySelectorAll(".dataUsuario");
  datos.forEach(d => {
    d.disabled = false;
  })
}
function vistaPassword(){
 const input =  document.getElementById("password");
  if(input.type == "password"){
      input.type = "text";
  }else{
      input.type = "password";
  }
}
function carrito(){
  window.location.href = "carrito.html";
}