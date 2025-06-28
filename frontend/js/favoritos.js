let divFavoritos = document.getElementById("carruselFotos");
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

        //LAUTI CHUPA PIJA
        //FALTA HACER BIEN EL INNER HTML ESE PARA MSOTRAR FAVORITOS
        //PUTO
        const data = await response.json();
        console.log(data);
        if (data.payload.length > 0) {
            data.payload.forEach(p => {
                console.log(p);
                divFavoritos.innerHTML += `<div class="card" id="card" data-id="${p.idProducto}">
                                                <img src="../img/remera1.jpg" alt="remera1">
                                                <div class="descripcionCard">
                                                    <p>${p.producto}</p>
                                                    <p class="agregarFavoritos" id="agregarFavoritos" onclick="eliminarFavorito(${p.idProducto})">Eliminar de favoritos</p>
                                                </div>
                                                <p>${p.precio}</p>
                                                <button class="btnAgregarCarrito btnUsuario">Agregar al carrito</button>
                                            </div>`;  
            });
        } else {   
            divFavoritos.innerHTML = `<p>No tienes productos en favoritos.</p>`;
        }   
    } catch (error) {
        console.error("Error al cargar favoritos:", error);
        divFavoritos.innerHTML = `<p>Error al cargar los favoritos.</p>`;
    }   
});