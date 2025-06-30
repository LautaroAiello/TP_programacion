const id_usuario = localStorage.getItem("id");
document.addEventListener("DOMContentLoaded", async() => {
    const tipoPago = document.getElementById("tipoPago");
    const camposTarjeta = document.querySelectorAll(".dataUsuario");
    const btnPagar = document.getElementById("btnPagar");
    const formulario = document.getElementById("pago");
    const listaProductos = document.getElementById("listaProductos");

    const carro = await traerCarro();
    const productosAgrupados = {};
    let totalPago = 0;
    carro.forEach(p => {
                if (!productosAgrupados[p.idInventario]) {
                    productosAgrupados[p.idInventario] = {
                        ...p,
                        cantidad: 1,
                        precioTotal: p.precio
                    };
                } else {
                    productosAgrupados[p.idInventario].cantidad += 1;
                    productosAgrupados[p.idInventario].precioTotal += p.precio;
                }
                totalPago += p.precio;
    });

    Object.values(productosAgrupados).forEach(p => {
        listaProductos.innerHTML += `
            <p>${p.producto} x${p.cantidad} - $${p.precioTotal}</p>
        `
    });
    listaProductos.innerHTML += `<p><strong>Total:</strong> $${totalPago}</p>`;


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

traerCarro = async () => {  
     try {
        const token = localStorage.getItem("authToken");
        const cargarCarrito = await fetch(`http://localhost:4000/api/obtenerProductosCarrito/${id_usuario}`, {
            headers: {
                Authorization: `${token}`
            }
        }).then(response => {
        if (!response.ok) {
            throw new Error("Error al obtener los productos del carrito");
        }  
            return response.json()
        });
        const productosCarrito = await cargarCarrito.payload;
        return productosCarrito;
    }catch (error) {
        console.error("Error al cargar el carrito:", error);
        alert("No se pudieron cargar los productos del carrito.");
    }
}
