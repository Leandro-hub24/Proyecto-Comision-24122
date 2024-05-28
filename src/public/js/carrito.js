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

