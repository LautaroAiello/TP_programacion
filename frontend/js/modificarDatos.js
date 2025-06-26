let form = document.getElementById("modificarForm");
let id = localStorage.getItem('id');
let tokenAuth = localStorage.getItem('authToken');

form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    let nombre = document.getElementById("nombreUsuario").value;
    let apellido = document.getElementById("apellidoUsuario").value;
    let direccion = document.getElementById("direccionUsuario").value;
    let telefono = document.getElementById("telefonoUsuario").value;
    let email = document.getElementById("emailUsuario").value;
    let password = document.getElementById("password").value;
    let rol = "user";
    try {
        await fetch(`http://localhost:4000/api/modificarUsuario/${id}`,{
            method : 'POST',
            headers:{
                'Content-type': 'application/json',
                'authorization': `${token}`
            },
            body: JSON.stringify({nombre,apellido,direccion,email,telefono,rol,password})
        })
        .then(response=>response.json())
        .then(data=>{
            window.location.reload();
        })
    } catch (error) {
        console.log(error)
    }
})