const formularioInicio = document.getElementById("formularioInicioSesion");

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
            console.log(data);
        })
    } catch (error) {
        console.error(error);
        alert('Error de logeo.');
    }
})