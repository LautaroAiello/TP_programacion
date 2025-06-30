let token = localStorage.getItem('authToken');
let rol = localStorage.getItem('rol');

function login(){ 
    document.getElementById("login").style.display = "flex";
}
function exit(){
    document.getElementById("login").style.display = "none";
    document.getElementById("mensajeError").style.display = "none";
}
function registro(){
    document.getElementById("login").style.display = "none";
    document.getElementById("registro").style.display = "flex";
}

function exitRe(){
    document.getElementById("registro").style.display = "none";
}



function darkMode() {
  document.body.classList.toggle("modo-oscuro");


  const esOscuro = document.body.classList.contains("modo-oscuro");
  localStorage.setItem("tema", esOscuro ? "oscuro" : "claro");
}

agregarProducto = () =>{
  window.location.href = "admin.html";
}


window.onload = () => {
  if (localStorage.getItem("tema") === "oscuro") {
    document.body.classList.add("modo-oscuro");
  }
}

perfilUsuario= () =>{
  if(token){
    window.location.href = 'datosUsuario.html';
  }else{
    login();
  }
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
  if(token){
    window.location.href = "carrito.html";
  }else{
    login();
  }
}

// function verProducto(){
//   if(token){
//     window.location.href = "producto.html";
//   }else{
//     login();
//   }
// }

function favoritos(){
  if(token){
    window.location.href = 'favoritos.html'
  }else{
    login();
  }
}

const textoSesiones = document.getElementById("textoSesiones");
const divLogin = document.getElementById("login");

textoCerrarSesion = () =>{
    if(token){
      textoSesiones.innerText = "Cerrar sesión";
      divLogin.innerHTML = `
                  <form id="formularioCierreSesion">
                    <p>¿Estas seguro que quieres cerrar sesión?</p>
                    <button type="button" class="btnRegistro" id="cierreSesionSi">Si</button>
                    <button type="button" class="btnRegistro" id="cierreSesionNo">No</button>
                  </form>
                  `
      const formularioCierreSesion = document.getElementById("formularioCierreSesion");
      const cerrarSesionNo = document.getElementById("cierreSesionNo");
      const cerrarSesionSi = document.getElementById("cierreSesionSi");
      cerrarSesionSi.addEventListener('click',()=>{
        localStorage.removeItem('authToken');
        localStorage.removeItem('id');
        localStorage.removeItem('rol');
        textoCerrarSesion();
        divLogin.style.display = "none";
        textoSesiones.innerText = "Iniciar sesión";
        window.location.href = "index.html";
      })
      cerrarSesionNo.addEventListener('click',()=>{
        divLogin.style.display = "none";
      })
    }else{
      textoSesiones.innerText = "Iniciar sesión";
    }
}


mostrarBotonAgregarProducto = () =>{
    const boton = document.getElementById("agregarProducto");
    boton.addEventListener('click',()=>{
      window.location.href = "admin.html"
    });
    const favoritos = document.getElementById("favoritos");
    if(favoritos){
      favoritos.style.display = "none";
    }
    const carrito = document.getElementById("carrito");
    if(carrito){
      carrito.style.display = "none";
    }
  }


function irAPagar(){
  window.location.href = 'pantallaPago.html';
}


const carruselFotos = document.getElementById("carruselFotos"); // Esto agrega la funcion de redireccionar al hacer click en las cards del carrusel de fotos

// if(carruselFotos){
//   carruselFotos.addEventListener("click", (e) => {
//     const card = e.target.closest(".card");
//     if (card) {
//       const id = card.dataset.id;
//         if (token) {
//           window.location.href = `producto.html?id=${id}`;
//         } else {
//           login();
//         }
//     }
//   });
// }

function redireccionesCarrusel(){
  if(carruselFotos){
          carruselFotos.addEventListener("click", (e) => {
            const card = e.target.closest(".card");
            if (card) {
              const id = card.dataset.id;
                if (token) {
                  window.location.href = `producto.html?id=${id}`;
                } else {
                  login();
                }
            }
          });
        }
}


async function obtenerIdsFavoritos() { // Esto obtiene los ids de los productos favoritos del usuario
    const idUser = localStorage.getItem("id");
    if (!idUser) return []; // Si no está logueado, retorna array vacío
    const response = await fetch(`http://localhost:4000/api/obtenerFavoritos/${idUser}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`
        }
    });
    const data = await response.json();
    return data.payload.map(f => f.idProducto);// Devuelve un array solo con los ids de producto favoritos
}

async function traerProductos(){ 
    try {
        const favoritosIds = await obtenerIdsFavoritos();
        const respuesta = await fetch("http://localhost:4000/api/obtenerProductos", {
            headers: {
                Authorization: `${token}`
            }
        });

        if (!respuesta.ok){
          throw new Error("Error al obtener productos");  
        } 
        const objeto = await respuesta.json();
        const productos = objeto.payload;
        if(!carruselFotos){
          return;
        }

        redireccionesCarrusel();

        carruselFotos.innerHTML = "";
        productos.forEach(p => {  
          let botonesHTML = "";
          let favorito = "";
          if(rol === "Admin"){
            botonesHTML = `<button class="btnAgregarCarrito btnAdmin">Modificar producto</button>`;
          } else if(rol === "User" || rol === null){ 
            //botonesHTML = `<button class="btnAgregarCarrito btnUsuario" id="agregarACarrito"></button>`;
            if (favoritosIds.includes(p.idProducto)) { // Verifica si el producto está en favoritos
              favorito = `<p class="agregarFavoritos" id="agregarFavoritos" onclick="eliminarFavorito(event, ${p.idProducto})">Eliminar de favoritos</p>`;
            } else {
              favorito = `<p class="agregarFavoritos" id="agregarFavoritos" onclick="agregarAFavoritos(event, ${p.idProducto})">Agregar a favoritos</p>`;
            }
          }
            carruselFotos.innerHTML += `<div class="card" id="card" data-id="${p.idProducto}"data-color="${p.color || ''}" 
                                        data-categoria="${p.categoria || ''}" 
                                        data-genero="${p.genero || ''}">
                                                <img src="../img/fotosRopa/${p.ulrImagen}" alt="remera1">
                                                <div class="descripcionCard">
                                                    <p>${p.producto}</p>
                                                    ${favorito}
                                                </div>
                                                <p>$${p.precio}</p>
                                            </div>` 
        });
    } catch (error) {
        console.error("Error al cargar productos:", error);
        alert("No se pudieron cargar los productos.");
    }
}

agregarAFavoritos = async (event, id_producto) => {
  event.stopPropagation();
  const id_usuario = localStorage.getItem("id");
  try {
    const respuesta = await fetch("http://localhost:4000/api/agregarFavorito", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
        Authorization: `${token}` 
      },
      body: JSON.stringify({id_producto,id_usuario })
    });
    const data = await respuesta.json();
    console.log(data);
  } catch (error) {
    console.error("Error al agregar a favoritos:", error);
  }
}


document.addEventListener('DOMContentLoaded', () => {
  if(!token){
    traerProductos();
  }else{
    traerProductos();
  }
  textoCerrarSesion();
  
  const btnAgregarProducto = document.getElementById("agregarProducto");
  if(btnAgregarProducto){
    if(rol === "Admin"){
      mostrarBotonAgregarProducto();
    }else if(rol === "User" || rol === null){
      btnAgregarProducto.style.display = "none";
    }
  }  
});





// filtrarPor = (tipo, valor) => {
//     const cards = document.querySelectorAll("#carruselFotos .card");
//     cards.forEach(card => {
//       console.log(card)
//         const producto = card.querySelector(".descripcionCard p").textContent.toLowerCase();
//         const color = card.querySelector(".color").textContent.toLowerCase();
//         if (tipo === 'categoria' && producto.includes(valor.toLowerCase())) {
//             card.style.display = "block";
//         } else if (tipo === 'color' && color.includes(valor.toLowerCase())) {
//             card.style.display = "block";
//         } else {
//             card.style.display = "none";
//         }
//     });
// }

