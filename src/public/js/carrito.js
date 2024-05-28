document.getElementById('carrito').addEventListener('click', function(event) {
    if (event.target === document.getElementById('carrito')) {
        cerrarCarrito()
    }
})

function cerrarCarrito(){
    document.getElementById('contenedorCarrito').classList.toggle('abrir')
    setTimeout(function () {
        document.getElementById('carrito').style.display = 'none'
    }, 700)
}

document.getElementById('open').addEventListener('click', () => {
    document.getElementById('carrito').removeAttribute('style')
    setTimeout(function () {
        document.getElementById('contenedorCarrito').classList.toggle('abrir')
    }, 100)
})

let compra = new Array
let cantCarrito = 0
let precioCarrito = 0

function addCarrito(id) {
   
        let url = `/productosCarrito/${id}`
        fetch(url)
        .then(res => res.json())
        .then( (producto) => {
                document.getElementById('cardsCarrito').innerHTML += `
                    <div class='cardCarrito'>
                        <div class="img">
                            <img src="${producto[0].img_url}" alt="Img">
                        </div> 
                        <h4>${producto[0].nombre}</h4>
                        <p>${producto[0].descripcion}</p>
                        <p>$<span>${producto[0].precio}</span></p>
                    </div>
                `
                let i = {producto_id: producto[0].producto_id,
                        precio: producto[0].precio,
                        cantidad: 1
                }
                compra.push(i)
                cantCarrito += 1
                precioCarrito += producto[0].precio
                actualizarCarrito()
            }) 
        
}

function actualizarCarrito() {
    document.getElementById('cant').innerHTML = cantCarrito
    document.getElementById('precioTotal').innerHTML = precioCarrito
}