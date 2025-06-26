let tkn = localStorage.getItem('authToken');
const idUsuario = localStorage.getItem('id');

let nombreUsuario = document.getElementById("nombreUsuario");
let apellidoUsuario = document.getElementById("apellidoUsuario");
let direccionUsuario = document.getElementById("direccionUsuario");
let telefonoUsuario = document.getElementById("telefonoUsuario");
let emailUsuario = document.getElementById("emailUsuario");
let password = document.getElementById("password");

traerDatosUsuario = async () =>{
    try {
        await fetch(`http://localhost:4000/api/obtenerDatosUsuario/${idUsuario}`,{
            method: 'GET',
            headers:{
                'Content-type' : 'application/json',
                'authorization' : `${tkn}`
            }
        })
        .then(response=>response.json())
        .then(data=>{
            completarDatos(data)
        })

    } catch (error) {
        console.error(error)
    }
}

completarDatos = (datos) =>{
    nombreUsuario.value= datos.payload[0].nombre
    apellidoUsuario.value= datos.payload[0].apellido
    direccionUsuario.value= datos.payload[0].direccion
    telefonoUsuario.value= datos.payload[0].telefono
    emailUsuario.value= datos.payload[0].email
    password.value= datos.payload[0].password
}

document.addEventListener('DOMContentLoaded',()=>{
    traerDatosUsuario();
})

