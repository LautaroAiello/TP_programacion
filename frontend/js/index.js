
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


  const esOscuro = document.body.classList.contains("modo-oscuro");
  localStorage.setItem("tema", esOscuro ? "oscuro" : "claro");
}


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

function favoritos(){
  window.location.href = 'favoritos.html'
}

const textoSesiones = document.getElementById("textoSesiones");
const divLogin = document.getElementById("login");

textoCerrarSesion = () =>{
    let token = localStorage.getItem('authToken');
    if(token){
      textoSesiones.innerText = "Cerrar sesión";
      divLogin.innerHTML = `
                  <form id="formularioCierreSesion">
                    <p>¿Estas seguro que quieres cerrar sesión?</p>
                    <button type="button" class="btnRegistro" id="cierreSesionSi">Si</button>
                    <button type="button" class="btnRegistro" id="cierreSesionNo">No</button>
                  </form>`
      const formularioCierreSesion = document.getElementById("formularioCierreSesion");
      const cerrarSesionNo = document.getElementById("cierreSesionNo");
      const cerrarSesionSi = document.getElementById("cierreSesionSi");
      cerrarSesionSi.addEventListener('click',()=>{
        localStorage.removeItem('authToken');
        textoCerrarSesion();
        divLogin.style.display = "none";
      })
      cerrarSesionNo.addEventListener('click',()=>{
        divLogin.style.display = "none";
      })
    }else{
      textoSesiones.innerText = "Iniciar sesión";
    }
}
document.addEventListener('DOMContentLoaded', () => {
  textoCerrarSesion();
});