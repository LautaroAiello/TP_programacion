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
formularioRegistroProducto.addEventListener('submit',(e)=>{
    e.preventDefault();
    const producto = document.querySelectorAll(".dataUsuario");
    producto.forEach(p => {
        console.log(p.value)
    });
})

