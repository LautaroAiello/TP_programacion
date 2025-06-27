document.addEventListener("DOMContentLoaded", () => {
    let total = document.getElementById("total");
    
    function actualizarTotal(){
        let suma = 0;
        document.querySelectorAll(".itemCarrito").forEach(div=>{
            const precio = Number(div.querySelector('.precioUnidad').innerText);
            suma += precio;
        });
        total.innerText = `$ ${suma.toLocaleString()}`
    }
    
    document.querySelectorAll('.itemCarrito').forEach(div => {
        const precio = div.querySelector('.precioUnidad');
        const cantidad = div.querySelector('.cantidad');
        const btnAumentar = div.querySelector('.aumentar');
        const btnDisminuir = div.querySelector('.disminuir');

        const precioUnitario = Number(precio.innerText);
        

        btnAumentar.addEventListener('click', () => {
            let cantidadActual = Number(cantidad.innerText);
            cantidadActual++;
            cantidad.innerText = cantidadActual;
            precio.innerText = `${precioUnitario * cantidadActual}`;
            actualizarTotal();
        });

        btnDisminuir.addEventListener('click', () => {
            let cantidadActual = Number(cantidad.innerText);
            if (cantidadActual > 1) {
                cantidadActual--;
                cantidad.innerText = cantidadActual;
                precio.innerText = `${precioUnitario * cantidadActual}`;
                actualizarTotal();
            }
        });

        actualizarTotal();
    });
})
// function eliminarItem(e){
//     const itemClickeado = e.target.closest(".itemCarrito");
//     let item = document.querySelectorAll(".itemCarrito");
//     item.forEach(i => {
//         if(item === itemClickeado){
//             item.innerText = "";
//             actualizarTotal();
//         }
//     })
// }