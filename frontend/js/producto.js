

document.addEventListener('DOMContentLoaded', () => {
    
    const rolUser = localStorage.getItem('rol');
    let productoUsuario = document.getElementById("productoUsuario");
    let formularioAdmin = document.getElementById("formularioAdmin");
  
    const btnAgregarProducto = document.getElementById("agregarProducto");
    
  if(rolUser === "Admin"){
    formularioAdmin.style.display = "grid";
    productoUsuario.style.display = "none";
  } else if(rolUser === "User"){
    formularioAdmin.style.display = "none";
    productoUsuario.style.display = "grid";
    btnAgregarProducto.style.display = "none";
  }

  obtenerProductoPorId();
})

function obtenerIdProducto() {
    const urlParametro = new URLSearchParams(window.location.search);
    return urlParametro.get('id');
}


async function obtenerProductoPorId() {
    const id = obtenerIdProducto();

    if (!id) {
        alert("No se encuentra el producto.")
        return;
    }
    try {
        const respuesta = await fetch(`http://localhost:4000/api/obtenerDatosProducto/${id}`, {
            headers: {
                Authorization: `${token}`
            }
        });

        if (!respuesta.ok) {
            throw new Error("Error al obtener el producto");
        }

        const producto = await respuesta.json();
        console.log(producto.payload);
        // Aca actualizar el DOM con los datos del producto. Esta solicitud te trae absolutamente todos los datos del producto, no te hace falta hacer otro GET.
        // Por ejemplo:  SANTI COME PIJA
        // document.getElementById("nombreProducto").innerText = producto.nombre;
        // document.getElementById("descripcion").innerText = producto.descripcion;
        // document.getElementById("precio").innerText = `$${producto.precio}`;
        // document.getElementById("imagen").src = producto.imagen;
    } catch (error) {
        console.error(error);
        alert("Error al cargar el producto");
    }
}
