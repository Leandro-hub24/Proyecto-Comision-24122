function formatear(i) {
    const decimal = Number(i.replace(",", ".")).toFixed(2); //cambiamos la "," por el "." por si introduce un string con ","
    const formated = decimal.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return formated;
}

document.getElementById('carrito').addEventListener('click', function (event) {
    if (event.target === document.getElementById('carrito')) {
        cerrarCarrito()
    }
})

function cerrarCarrito() {
    document.getElementById('contenedorCarrito').classList.remove('abrir')
    setTimeout(function () {
        document.getElementById('carrito').style.display = 'none'
    }, 700)
}

document.getElementById('open').addEventListener('click', () => {
    document.getElementById('carrito').removeAttribute('style')
    setTimeout(function () {
        document.getElementById('contenedorCarrito').classList.add('abrir')
    }, 100)
})

let compra = new Array
let cantCarrito = 0
let precioCarrito = 0

function addCarrito(id) {

    let url = `/productosCarrito/${id}`
    fetch(url)
        .then(res => res.json())
        .then((producto) => {
            document.getElementById('cardsCarrito').innerHTML += `
                    <div class='cardCarrito' id="card-${producto[0].producto_id}">
                        <div class="izq">
                            <div class="img">
                                <img src="${producto[0].img_url}" alt="Img">
                            </div>
                            <div class="infoPro">
                                <h5>${producto[0].nombre}</h5>
                                <p>${producto[0].descripcion}</p>
                            </div>
                            
                        </div>
                        <div class="med">
                            <i class='bx bxs-x-square' onclick="quitarCarrito(${producto[0].producto_id})"></i>
                        </div>
                        <div class="der">
                            <p>$<span id="precioCant-${producto[0].producto_id}">${formatear(`${producto[0].precio}`)}</span></p>
                            <input type="number" name="cantProd" id="cantProd-${producto[0].producto_id}" value="1" oninput="inputCant(${producto[0].producto_id})">
                            
                        </div>
                    </div>
                `
            let i = {
                producto_id: producto[0].producto_id,
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
    document.getElementById('precioTotal').innerHTML = formatear(`${precioCarrito}`)
    document.getElementById('totalCarrito').innerHTML = formatear(`${precioCarrito}`)
}

function quitarCarrito(id) {
    document.getElementById(`card-${id}`).remove()
    const filtro = (lista) => {
        return lista.filter(elemento => elemento.producto_id !== id);
    }
    const index = (lista) => {
        let producto = {};

        producto = lista.find(elemento => elemento.producto_id === id);
        let i = lista.indexOf(producto)
        return i
    }
    
    cantCarrito -= compra[index(compra)].cantidad
    precioCarrito -= (compra[index(compra)].precio*compra[index(compra)].cantidad)

    compra = filtro(compra)
    actualizarCarrito()
}

function inputCant(id) {
    if(document.getElementById(`cantProd-${id}`).value === "0") {
        quitarCarrito(id)
    }
}