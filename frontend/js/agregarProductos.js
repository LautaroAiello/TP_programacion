const formularioRegistroProducto = document.getElementById("editarFormAdmin");
const formularioCategoria = document.getElementById("formCategoria");
const formularioInventario = document.getElementById("formInventario");
let tokenAuth = localStorage.getItem('authToken');



formularioCategoria.addEventListener("submit", async (e) =>{ // este formulario crea una categoria
    e.preventDefault();
    let nombre= document.getElementById("categoria").value;
    try {
        const crearCategoria = await fetch('http://localhost:4000/api/crearCategoria',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                Authorization: `${tokenAuth}`
            },
            body: JSON.stringify({nombre}) 
        });
        if(!crearCategoria.ok){
            throw new Error("Error en la solicitud.");
        }
        const nombreCategoria = await crearCategoria.json();
        console.log("Categoria cargada correctamente.", nombreCategoria);
        document.getElementById("mensajeExitoCategoria").style.display = "block";
        cargarIDCategorias();
        setTimeout(()=> {
            document.getElementById("mensajeExitoCategoria").style.display = "none";
            formularioCategoria.reset();
            // window.location.reload();
        },2000)
    } catch (error) {
        console.error(error)
        alert("Error al crear categoria.")
    }
})


async function cargarIDCategorias(){ //Esta función carga las categorías en el select del formulario de registro de productos
    try {
        const respuesta = await fetch("http://localhost:4000/api/obtenerCategorias", {
            method: 'GET',
            headers: {
                Authorization: `${tokenAuth}`
            }
        });
        if (!respuesta.ok){
          throw new Error("Error al obtener categorías");  
        } 
        const objeto = await respuesta.json();
        console.log("Categorias obtenidas:", objeto);
        const categorias = objeto.payload;
        const selectCategoria = document.getElementById("categoriaSelect");
        selectCategoria.innerHTML = `<option value="" class="dataUsuario">Seleccionar categoria</option>`;
        if (Array.isArray(categorias) && categorias.length > 0) {
            categorias.forEach(cat => {
                selectCategoria.innerHTML += `<option value="${cat.id_categoria}" class="dataUsuario" >${cat.nombre}</option>` 
            });
        } else {
            // Si no hay categorías, muestra un mensaje o deja solo la opción por defecto
            console.warn("No hay categorías disponibles.");
        }
    } catch (error) {
        console.error("Error al cargar categorías:", error);
        alert("No se pudieron cargar las categorías.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    cargarIDCategorias();
});


formularioRegistroProducto.addEventListener('submit', async (e)=>{ //este formulario carga un producto
    e.preventDefault();   
        let nombre = document.getElementById("nombre").value;
        let descripcion = document.getElementById("descripcion").value;
        let precio = parseInt(document.getElementById("precio").value);
        let genero = document.getElementById("generoSelect").value;
        let id_categoria = parseInt(document.getElementById("categoriaSelect").value);
        let imagen = document.getElementById("imagen").files[0];
        imagen = imagen.name;
        try {
            const cargarProducto = await fetch('http://localhost:4000/api/cargarProducto', {
                method: 'POST',
                headers:{
                    'Content-type' : 'application/json',
                    Authorization: `${tokenAuth}`
                },
                body: JSON.stringify({nombre,descripcion,precio,genero,id_categoria,imagen})
            });
            if(!cargarProducto.ok){
                throw new Error("Error en la solicitud.");
            }
            const resultado = await cargarProducto.json();
            console.log("Producto cargado correctamente.", resultado);
            document.getElementById("mensajeExitoProducto").style.display = "block";
            cargarIDproductos();
            setTimeout(()=> {
                document.getElementById("mensajeExitoProducto").style.display = "none";
                formularioRegistroProducto.reset();
                // window.location.reload();
            },2000)

        } catch (error) {
            console.error(error);
            alert("Error al cargar producto.")
        }



})


async function cargarIDproductos(){     //Esta función carga los productos en el select del formulario de inventario
    try {
        const respuesta = await fetch("http://localhost:4000/api/obtenerProductos", {
            headers: {
                Authorization: `${tokenAuth}`
            }
        });

        if (!respuesta.ok){
          throw new Error("Error al obtener categorías");  
        } 
        const objeto = await respuesta.json();
        const productos = objeto.payload;
        const selectIDProducto = document.getElementById("productoSelect");
        selectIDProducto.innerHTML = `<option value="" class="dataUsuario">Seleccionar producto</option>`;
        productos.forEach(p => {
            selectIDProducto.innerHTML += `<option value="${p.idProducto}" class="dataUsuario" >${p.producto}</option>` 
        });
    } catch (error) {
        console.error("Error al cargar categorías:", error);
        alert("No se pudieron cargar las categorías.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    cargarIDproductos();
});

formularioInventario.addEventListener("submit", async (e) => { //este formulario crea un inventario
    e.preventDefault();
    let talle = document.querySelector('[name="talles"]:checked').value;
    let color = document.getElementById("color").value;
    let stock = parseInt(document.getElementById("stock").value);
    let id_producto = parseInt(document.getElementById("productoSelect").value);

    try {
        const cargarInventario = await fetch('http://localhost:4000/api/crearInventario',{
            method: 'POST',
                headers:{
                    'Content-type' : 'application/json',
                    Authorization: `${tokenAuth}`                                       
                },
            body: JSON.stringify({talle,color,stock,id_producto})
        });
        if(!cargarInventario.ok){
            const errText = await cargarInventario.text();
            throw new Error("Error al crear inventario: " + errText);
        }
        const inventario = await cargarInventario.json();
        console.log("Inventario creado con exito.",inventario);
        document.getElementById("mensajeExitoInventario").style.display = "block";
        setTimeout(()=> {
            document.getElementById("mensajeExitoInventario").style.display = "none";
            formularioInventario.reset();
            // window.location.reload();
        },2000)
        
    } catch (error) {
        console.error(error)
        alert("Error al crear inventario.")
    }
})
