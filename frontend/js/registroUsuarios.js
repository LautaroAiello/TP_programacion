const email = document.getElementById("emailRegistro");
const emailRepetido = document.getElementById("emailRegistroRepetir");
const emailErrorBox = document.getElementById("emailError");
const emailVerificacion = document.getElementById("emailVerificacion");

const password = document.getElementById("contraseñaRegistro");
const passwordRepetida = document.getElementById("contraseñaRegistroRepetir");
const passwordErrorBox = document.getElementById("passwordError");
const passwordVerificacion = document.getElementById("passwordVerificacion");


emailRepetido.addEventListener("blur", () =>{
        if(emailRepetido.value !== email.value){
            emailErrorBox.style.display = "block";
            emailVerificacion.style.display = "block";
            emailVerificacion.innerText = "El e-mail debe coincidir.";
        }else{
            emailErrorBox.style.display = "none";
            emailVerificacion.style.display = "none";
            emailVerificacion.innerText = "";
        }
})

passwordRepetida.addEventListener("blur", () => {
    if(passwordRepetida.value !== password.value){
        passwordErrorBox.style.display = "block";
        passwordVerificacion.style.display = "block";
        passwordVerificacion.innerText = "La contraseña debe coincidir."
    }
})

let formulario = document.getElementById("formularioRegistro"); 
    
formulario.addEventListener('submit', async(e)=>{
    
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const direccion = document.getElementById("direccion").value;
    const telefono = document.getElementById("telefono").value;
    const rol = "User";
    

    
    try {
        const registrar = await fetch('http://localhost:4000/api/registrarUsuario',{
            method: 'POST',
            headers:{
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({nombre,apellido,direccion,email: email.value,telefono,rol,password: password.value})
        });
        if(!registrar.ok){
            throw new Error("Error en la solicitud.");
        }
        const resultado = registrar.json();
        console.log("Registrado correctamente",resultado);
        const mensajeRegistroExitoso = document.getElementById("mensajeRegistroExitoso");
        mensajeRegistroExitoso.style.display = "block";
        mensajeRegistroExitoso.innerText = "Registro exitoso!"
        setTimeout(() => {
            document.getElementById("registro").style.display = "none";
            mensajeRegistroExitoso.style.display = "none";
        },2000)
    } catch (error) {
        console.error(error);
        alert("Error al registrar usuario.");
    }
})



