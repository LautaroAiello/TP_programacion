obtenerCategorias = async () => {
    try {
        const respuesta = await fetch("http://localhost:4000/api/obtenerCategorias", {
            headers: {
                Authorization: `${token}`
            }
        });

        if (!respuesta.ok) {
            throw new Error("Error al obtener categorías");
        } 
        const objeto = await respuesta.json();
        const categorias = objeto.payload;
        const selectIDCategoria = document.getElementById("submenuCategoria");
        categorias.forEach(c => {
            selectIDCategoria.innerHTML += `<li><a onclick="filtrarPor('categoria', '${c.nombre}')">${c.nombre}</a></li>` 
        });
    } catch (error) {
        console.error("Error al cargar categorías:", error);
        alert("No se pudieron cargar las categorías.");
    }
}

obtenerColores = async () => {
    try {
        const respuesta = await fetch("http://localhost:4000/api/obtenerProductos", {
            headers: {
                Authorization: `${token}`
            }
        });

        if (!respuesta.ok){
          throw new Error("Error al obtener productos");  
        } 
        const objeto = await respuesta.json();
        const productos = objeto.payload;
        const selectIDColor = document.getElementById("submenuColor");
        let colores = new Set();
        productos.forEach(c => {
          if(c.color != null){
            colores.add(c.color); 
          }
        });
        colores = Array.from(colores).map(color => ({ color })); 
        colores.forEach(c => {
            selectIDColor.innerHTML += `<li><a onclick="filtrarPor('color', '${c.color}')">${c.color}</a></li>` 
        });
    } catch (error) {
        console.error("Error al cargar colores:", error);
        alert("No se pudieron cargar los colores.");
    } 
}

filtrarPor = (tipo, valor) => {
    const cards = document.querySelectorAll("#carruselFotos .card");
    cards.forEach(card => {
        let match = false;
        if (tipo === 'categoria') {
            const categoria = card.getAttribute('data-categoria') || '';
            match = categoria.toLowerCase() === valor.toLowerCase();
        } else if (tipo === 'color') {
            const color = card.getAttribute('data-color') || '';
            match = color.toLowerCase() === valor.toLowerCase();
        } else if (tipo === 'genero') {
            const genero = card.getAttribute('data-genero') || '';
            match = genero.toLowerCase() === valor.toLowerCase();
        }
        card.style.display = match ? 'block' : 'none';
    });
}

function mostrarTodos() {
    const cards = document.querySelectorAll("#carruselFotos .card");
    cards.forEach(card => card.style.display = "block");
}

const inputBuscador = document.getElementById("buscador");

inputBuscador.addEventListener("input", () => {
    const valor = inputBuscador.value.toLowerCase();
    const cards = document.querySelectorAll("#carruselFotos .card");

    cards.forEach(card => {
        const nombreProducto = card.querySelector(".descripcionCard p").textContent.toLowerCase();

        // Verificamos si incluye lo buscado
        if (nombreProducto.includes(valor)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    obtenerCategorias();
    obtenerColores();
})