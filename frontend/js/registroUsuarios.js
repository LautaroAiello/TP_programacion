
let formulario = document.getElementById("formularioRegistro"); 
    
formulario.addEventListener('submit', async(e)=>{
    
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const direccion = document.getElementById("direccion").value;
    const email = document.getElementById("emailRegistro").value;
    const password = document.getElementById("contraseñaRegistro").value;
    const telefono = document.getElementById("telefono").value;
    const rol = "User";
    
    try {
        const registrar = await fetch('http://localhost:4000/api/registrarUsuario',{
            method: 'POST',
            headers:{
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({nombre,apellido,direccion,email,telefono,rol,password})
        });
        if(!registrar.ok){
            throw new Error("Error en la solicitud.");
        }
        const resultado = registrar.json();
        console.log("Registrado correctamente",resultado);
    } catch (error) {
        console.error(error);
        alert("Error al registrar usuario.");
    }
})

