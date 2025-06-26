const formularioInicio = document.getElementById("formularioInicioSesion");
const loginDiv = document.getElementById("login");
//const textoSesiones = document.getElementById("textoSesiones");

// const msjEmail = document.getElementById("msjErrorEmail");
// const msjPsw = document.getElementById("pswErrorEmail");

// email.addEventListener("blur", () =>{
//     if(email.value == ""){
//         msjEmail.style.display = "block";
//         msjEmail.innerText = "Por favor escriba su e-mail";
//     }else{
//         msjEmail.style.display = "none";
//         msjEmail.innerText = "";
//     }
// })
// password.addEventListener("blur", () =>{
//     if(password.value == ""){
//         msjPsw.style.display = "block";
//         msjPsw.innerText = "Por favor escriba su contraseña";
//     }else{
//         msjPsw.style.display = "none";
//         msjPsw.innerText = "";
//     }
// })

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
                guardarInicioLocalStorage("authToken",data.jwt);
                guardarInicioLocalStorage("id",data.payload[0].id_usuario)
                window.location.reload();
                inicioSesionExitosa(data.payload[0].nombre);
                setTimeout(()=>{
                   loginDiv.style.display = "none";
                },2000)

            }else{
                let mensajeError = document.getElementById("mensajeError");
                mensajeError.style.display = "block";
                mensajeError.innerText = "Email o contraseña incorrectos."
            }
        })
    } catch (error) {
        console.error(error);
        alert('Error de logeo.');
    }
})

vistaRol = () =>{

}

inicioSesionExitosa = (nombre) =>{
    loginDiv.style.padding = "80px";
    loginDiv.style.width = "300px";
    loginDiv.style.left = "38%";
    loginDiv.innerHTML = `  <h2 class="loginExitoso">Inicio de sesion exitoso</h2>
                            <p class="logBienvenida">Bienvenido ${nombre}!</p>`
}

guardarInicioLocalStorage = (nombreToken,token) =>{
    localStorage.setItem(nombreToken, token);
}

eliminarTokenLocalStorage = () =>{
    localStorage.removeItem('authToken');
}

cambioTextoCerrarSesion = () =>{
    
}
