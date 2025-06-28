const rolUser = localStorage.getItem('rol');
let productoUsuario = document.getElementById("productoUsuario");
let formularioAdmin = document.getElementById("formularioAdmin");
let formEditarProducto = document.getElementById("formEditarProducto");

document.addEventListener('DOMContentLoaded', async () => {
    
  
    const btnAgregarProducto = document.getElementById("agregarProducto");
    
    let producto = await obtenerProductoPorId();
    console.log(producto);
    if(rolUser === "Admin"){
        formularioAdmin.style.display = "grid";
        productoUsuario.style.display = "none";
        mostrarDatosAdmin(producto);
    } else if(rolUser === "User"){
        formularioAdmin.style.display = "none";
        productoUsuario.style.display = "grid";
        btnAgregarProducto.style.display = "none";
        mostrarDatosUser(producto);
    }

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
        // Aca actualizar el DOM con los datos del producto. Esta solicitud te trae absolutamente todos los datos del producto, no te hace falta hacer otro GET.
        // Por ejemplo:  SANTI COME PIJA
        // document.getElementById("nombreProducto").innerText = producto.payload[0].producto;
        // document.getElementById("descripcionProducto").innerText = producto.payload[0].descripcion;
        // document.getElementById("precioProducto").innerText = producto.payload[0].precio;
        return producto;
        //document.getElementById("imagen").src = producto.imagen;
    } catch (error) {
        console.error(error);
        alert("Error al cargar el producto");
    }
}

mostrarDatosAdmin = (producto)=>{
    document.getElementById("nombreProductoAdmin").value = producto.payload[0].producto;
    document.getElementById("descripcionProductoAdmin").value = producto.payload[0].descripcion;
    document.getElementById("precioProductoAdmin").value = producto.payload[0].precio;
    document.getElementById("coloresProductoAdmin").value = producto.payload[0].color;
    const radiosTalle = document.querySelectorAll('input[name="talles"]');
    radiosTalle.forEach(radio => {
        if (radio.value === producto.payload[0].talle) {
            radio.checked = true;
        }
    });
}

mostrarDatosUser= (producto) =>{
    document.getElementById("nombreProducto").innerText = producto.payload[0].producto;
    document.getElementById("descripcionProducto").innerText = producto.payload[0].descripcion;
    document.getElementById("precioProducto").innerText = producto.payload[0].precio;
}