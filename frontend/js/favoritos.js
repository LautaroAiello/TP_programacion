let divFavoritos = document.getElementById("carruselFotosFavoritos");
let tokenUser = localStorage.getItem("authToken");
let idUser = localStorage.getItem("id");

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch(`http://localhost:4000/api/obtenerFavoritos/${idUser}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${tokenUser}`
            }
        });

        
        const data = await response.json();
        console.log(data);
        if (data.payload.length > 0) {
            // Usamos un Set vacio para evitar duplicados
            const idsAgregados = new Set();
            data.payload.forEach(p => {
                if (!idsAgregados.has(p.idProducto)){
                    console.log(p.idProducto);
                    idsAgregados.add(p.idProducto);
                    if (p.producto && p.precio) {
                        divFavoritos.innerHTML += `<div class="card" id="card-fav-${p.idProducto}" data-id="${p.idProducto}">
                            <img src="../img/remera1.jpg" alt="remera1">
                            <div class="descripcionCard">
                                <p>${p.producto}</p>
                                <p class="agregarFavoritos" id="agregarFavoritos" onclick="eliminarFavorito(${p.idProducto})">Eliminar de favoritos</p>
                            </div>
                            <p>${p.precio}</p>
                            <button class="btnAgregarCarrito btnUsuario">Agregar al carrito</button>
                        </div>`; 
                    }
                }
            });
        } else {   
            divFavoritos.innerHTML = `<p>No tienes productos en favoritos.</p>`;
        }   
    } catch (error) {
        console.error("Error al cargar favoritos:", error);
        divFavoritos.innerHTML = `<p>Error al cargar los favoritos.</p>`;
    }   
});


function eliminarFavorito(idProducto) {
    const id_usuario = localStorage.getItem("id");
    const tokenUser = localStorage.getItem("authToken");
    fetch("http://localhost:4000/api/eliminarFavorito", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${tokenUser}`
        },
        body: JSON.stringify({ id_usuario, id_producto: idProducto })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        // Eliminar la card del DOM sin recargar la página
        const card = document.getElementById(`card-fav-${idProducto}`);
        if (card) {
            card.remove();
        }
        // Si ya no quedan cards, mostrar mensaje
        if (divFavoritos.querySelectorAll('.card').length === 0) {
            divFavoritos.innerHTML = `<p>No tienes productos en favoritos.</p>`;
        }
    })
    .catch(error => {
        console.error("Error al eliminar favorito:", error);
    });
}