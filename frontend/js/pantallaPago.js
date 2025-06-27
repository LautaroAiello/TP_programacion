document.addEventListener("DOMContentLoaded", () => {
    const tipoPago = document.getElementById("tipoPago");
    const camposTarjeta = document.querySelectorAll(".dataUsuario");
    const btnPagar = document.getElementById("btnPagar");
    const formulario = document.getElementById("pago");


    tipoPago.addEventListener("change", () => {
        if (tipoPago.value === "credito" || tipoPago.value === "debito") {
            camposTarjeta.forEach(campo => campo.classList.add("mostrar"));
        } else {
            camposTarjeta.forEach(campo => {
                campo.classList.remove("mostrar");
                campo.value = "";
            });
        }
        validarFormulario();
    });


    formulario.addEventListener("input", validarFormulario);

    function validarFormulario() {
        if (tipoPago.value === "transferencia") {
            btnPagar.disabled = false;
            return;
        }
        let completos = true;
        camposTarjeta.forEach(campo => {
            if (campo.classList.contains("mostrar") && campo.value.trim() === "") {
                completos = false;
            }
        });
        btnPagar.disabled = !completos;
    }

    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        let mensaje = document.getElementById("msjPagoExitoso");
        mensaje.style.display = "block";
        setTimeout(()=>{
             mensaje.style.display = "none";
        },2000);
        
    });
});