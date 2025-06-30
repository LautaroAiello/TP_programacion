let id_usuario = localStorage.getItem("id");
let carritoItems = document.getElementById("carritoItems");

cargarCarrito = async()=>{
    document.addEventListener("DOMContentLoaded", async () => {
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
                return response.json();
            });
    
            const productosCarrito = await cargarCarrito.payload;
    
            // Agrupar productos por idInventario
            const productosAgrupados = {};
            productosCarrito.forEach(p => {
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
            });
    
            // Mostrar solo un div por idInventario
            carritoItems.innerHTML = "";
            Object.values(productosAgrupados).forEach(p => {
                carritoItems.innerHTML += `
                    <div class="itemCarrito">
                        <img src="../img/remera1.jpg" alt="remera" class="imgCarritoPrenda">
                        <p>${p.producto}</p>
                        <p class="precioUnidad">$${p.precioTotal}</p>
                        <p class="cantidad">${p.cantidad}</p>
                        <img src="../img/trash-can.png" alt="eliminar" onclick="eliminarProducto(${p.idInventario})" class="eliminar">
                    </div>`;
            });
        } catch (error) {
            console.error("Error al cargar el carrito:", error);
            alert("No se pudieron cargar los productos del carrito.");
        }
    })
}
cargarCarrito();

async function eliminarProducto(idInventario) {
    try {
        const response = await fetch(`http://localhost:4000/api/eliminarProductoCarrito`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`
            },
            body: JSON.stringify({ id_usuario, id_inventario : idInventario })
        });
        console.log(await response.json())
        if (!response.ok) {
            throw new Error('No se pudo eliminar el producto del carrito');
        }
        window.location.reload();
    } catch (error) {
        alert(error.message);
    }
}