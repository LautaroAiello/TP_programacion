// POST - /api/cargarProducto
//         body:
//         {
//             nombre: string
//             descripcion: string
//             precio: number
//             genero: string
//             id_categoria: number
//             imagen: string

//         }

const formularioRegistroProducto = document.getElementById("editarFormAdmin");
let tokenAuth = localStorage.getItem('authToken');


formularioRegistroProducto.addEventListener('submit', async (e)=>{
    e.preventDefault();   
        let nombre = document.getElementById("nombre").value;
        let descripcion = document.getElementById("descripcion").value;
        let precio = parseInt(document.getElementById("precio").value);
        let genero = document.getElementById("genero").value;
        let id_categoria = parseInt(document.getElementById("categoria").value);
        let imagen = document.getElementById("imagen").value;
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
            // MENSAJE DE CARGA EXITOSA

        } catch (error) {
            console.error(error);
            alert("Error al cargar producto.")
        }



})

