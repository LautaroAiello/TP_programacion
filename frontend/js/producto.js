const rolUser = localStorage.getItem('rol');
let productoUsuario = document.getElementById("productoUsuario");
let formularioAdmin = document.getElementById("formularioAdmin");
let formEditarProducto = document.getElementById("formEditarProducto");
let datosProductos = document.getElementById("datosProductos");
const selectCuota = document.getElementById("cuota");
const precioCuota = document.getElementById("precioCuota");

selectCuota.addEventListener("change", () => {
    const precioProducto = document.getElementById("precioProducto").innerText;
    const precio = parseFloat(precioProducto.replace(/[$.]/g, ''));
    const cuotaSeleccionada = parseInt(selectCuota.value);
    
    if (cuotaSeleccionada > 0) {
        const precioPorCuota = (precio / cuotaSeleccionada).toFixed(2);
        precioCuota.innerText = `Precio por cuota: $${precioPorCuota}`;
    } else {
        precioCuota.innerText = "";
    }   
});

document.addEventListener('DOMContentLoaded', async () => {
    
  
    const btnAgregarProducto = document.getElementById("agregarProducto");
    
    let producto = await obtenerProductoPorId();
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
        console.log(producto);
        return producto;
        //document.getElementById("imagen").src = producto.imagen;
    } catch (error) {
        console.error(error);
        alert("Error al cargar el producto");
    }
}

mostrarDatosAdmin = (producto)=>{
    console.log(producto);
    
     // Valida que el producto y su payload existen y tienen datos
    if (!producto || !producto.payload || !producto.payload[0]) {
        let mensajeErrorStock = document.getElementById("mensajeStockAdmin");
        mensajeErrorStock.innerText = "Este producto no tiene inventario y no se puede modificar el stock.";
        mensajeErrorStock.style.display = "block";
        mensajeErrorStock.style.color = "red";
        return;
    }
    // Si no hay inventario para este producto
    if (producto.payload[0].idInventario === undefined || producto.payload[0].idInventario === null) {
        document.getElementById("nombreProductoAdmin").value = producto.payload[0].producto;
        document.getElementById("descripcionProductoAdmin").value = producto.payload[0].descripcion;
        document.getElementById("precioProductoAdmin").value = producto.payload[0].precio;
        document.getElementById("imgProducto").src = `../img/fotosRopa/${producto.payload[0].ulrImagen}`;
        document.getElementById("coloresProductoAdmin").value = "";
        document.getElementById("stockNuevo").disabled = true;
        let mensajeErrorStock = document.getElementById("mensajeStockAdmin");
        mensajeErrorStock.innerText = "Este producto no tiene inventario y no se puede modificar el stock.";
        mensajeErrorStock.style.display = "block";
        mensajeErrorStock.style.color = "red";
        return;
    }
    // Si hay inventario
        document.getElementById("nombreProductoAdmin").value = producto.payload[0].producto;
        document.getElementById("descripcionProductoAdmin").value = producto.payload[0].descripcion;
        document.getElementById("precioProductoAdmin").value = producto.payload[0].precio;
        document.getElementById("coloresProductoAdmin").value = producto.payload[0].color;
        document.getElementById("imgProductoAdmin").src = `../img/fotosRopa/${producto.payload[0].ulrImagen}`;
        document.getElementById("stockNuevo").disabled = false;
        const radiosTalle = document.querySelectorAll('input[name=\"talles\"]');
        radiosTalle.forEach(radio => {
            if (radio.value === producto.payload[0].talle) {
                radio.checked = true;
            }
    });
    
}

mostrarDatosUser = (producto) => {
    if (!producto || !producto.payload || !producto.payload[0]) {
        let mensajeErrorStock = document.getElementById("mensajeStockUser");
        let btnAgregarAlCarrito = document.getElementById("btnAgregarAlCarrito");
        let coloresProducto = document.getElementById("coloresProducto");
        let tallesProducto = document.getElementById("tallesProducto");
        document.getElementById("imgProducto").src = `../img/fotosRopa/${producto.payload[0].ulrImagen}`;
        let cantidadTitulo = document.getElementById("cantidadTitulo");
        let stock = document.getElementById("stock");
        mensajeErrorStock.innerText = "Este producto no está disponible.";
        mensajeErrorStock.style.display = "block";
        mensajeErrorStock.style.color = "red";
        btnAgregarAlCarrito.style.display = "none";
        coloresProducto.style.display = "none";
        tallesProducto.style.display = "none";
        stock.style.display = "none";
        cantidadTitulo.style.display = "none";


        return;
    }
    console.log(producto);
    document.getElementById("nombreProducto").innerText = producto.payload[0].producto;
    document.getElementById("descripcionProducto").innerText = producto.payload[0].descripcion;
    let precioProducto = document.getElementById("precioProducto").innerText = `$${producto.payload[0].precio}`;
    document.getElementById("coloresProducto").innerHTML += `
                                                    <span>Color:</span>                           
                                                             <p>${producto.payload[0].color}</p>
    `;
    document.getElementById("tallesProducto").innerHTML += `
                                                    <span>Talle:</span>                           
                                                             <p>${producto.payload[0].talle}</p>
    `;
    document.getElementById("imgProducto").src = `../img/fotosRopa/${producto.payload[0].ulrImagen}`;
}


//Modificar stock
formEditarProducto.addEventListener("submit", async (e) =>{
    e.preventDefault();
    let producto = await obtenerProductoPorId();
    let stock = document.getElementById("stockNuevo").value;
    let id_inventario = producto.payload[0].idInventario;
    try {
        const modificarStock = await fetch('http://localhost:4000/api/modificarStock',{
            method: 'PUT',
            headers:{
                'Content-Type':'application/json',
                Authorization: `${token}`
            },
            body: JSON.stringify({stock, id_inventario}) 
        });
        if(!modificarStock.ok){
            const errorText = await modificarStock.text();
            console.error("Respuesta del backend:", errorText);
            throw new Error("Error en la solicitud.");
        }
        const stockNuevo = await modificarStock.json();
        console.log("Stock modificado correctamente.", stockNuevo);
        let mensajeExitoStock = document.getElementById("mensajeStockAdmin");
        mensajeExitoStock.innerText = "Stock modificado correctamente!";
        mensajeExitoStock.style.color = "green";
        mensajeExitoStock.style.display = "block";
        formEditarProducto.reset();
        setTimeout(() => {
            mensajeExitoStock.style.display = "none";
        }, 2000);
    } catch (error) {
        console.error(error)
        alert("Error al modificar stock.")
    }
})

agregarACarrito = async () => {  
    const id_usuario = localStorage.getItem("id");
    const tokenUser = localStorage.getItem("authToken");
    let producto = await obtenerProductoPorId();
    let id_inventario = producto.payload[0].idInventario;
    if(!id_inventario) {
        alert("Este producto no tiene inventario y no se puede agregar al carrito.");
        return;
    }else{
        try {
            fetch("http://localhost:4000/api/agregarACarrito", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${tokenUser}`
                },
                body: JSON.stringify({id_inventario, id_usuario})
            })
            .then(res => res.json())
            .then(data => {
                datosProductos.innerHTML += `<p class="productoAgregado">Producto agregado al carrito correctamente.</p>`;
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            });
        } catch (error) {
            console.error("Error al agregar al carrito:", error);
            alert("Ocurrió un error al intentar agregar el producto al carrito.");
        }
    }
}