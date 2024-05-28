document.getElementById('carrito').addEventListener('click', function(event) {
    if (event.target === document.getElementById('carrito')) {
        cancelarForm()
    }
})

function cancelarForm(){
    document.getElementById('contenedorCarrito').classList.toggle('abrir')
    setTimeout(function () {
        document.getElementById('carrito').style.display = 'none'
    }, 700)
}