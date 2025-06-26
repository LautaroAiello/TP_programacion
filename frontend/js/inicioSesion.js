const formularioInicio = document.getElementById("formularioInicioSesion");
const loginDiv = document.getElementById("login");
//const textoSesiones = document.getElementById("textoSesiones");

formularioInicio.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const email = document.getElementById("emailInicioSesion").value;
    const password = document.getElementById("contraseñaInicioSesion").value;
    try {
        const login = await fetch('http://localhost:4000/api/login',{
            method: 'POST',
            headers:{
                'Content-type' : 'application/json'
            },
            body:JSON.stringify({email, password})
        })
        .then(response=> response.json())
        .then(data=>{
            if(data.payload.length != 0){
                console.log(data);
                loginDiv.style.display = "none";
                alert("Inicio de sesion exitoso!");//HACER UN INNER HTML CON UN CUADRO MAS LINDO DE NOTIFICAICION DE INICIO DE SESION EXITOSA.
                //inicioSesionExitosa(data.payload[0].nombre);
                guardarInicioLocalStorage("authToken",data.jwt);
                guardarInicioLocalStorage("id",data.payload[0].id_usuario)
                window.location.reload();
            }else{
                alert("Contraseña o email incorrecta");
            }
        })
    } catch (error) {
        console.error(error);
        alert('Error de logeo.');
    }
})

inicioSesionExitosa = (nombre) =>{

}

guardarInicioLocalStorage = (nombreToken,token) =>{
    localStorage.setItem(nombreToken, token);
}

eliminarTokenLocalStorage = () =>{
    localStorage.removeItem('authToken');
}

cambioTextoCerrarSesion = () =>{
    
}
