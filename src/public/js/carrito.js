let compra = new Array
let cantCarrito = 0
let precioCarrito = 0

window.addEventListener('load', () => {
    if(localStorage){
        if(localStorage.getItem('carrito') !== undefined && localStorage.getItem('carrito')){
            compra = JSON.parse(localStorage.getItem('carrito'))
            showCarritoSave()
        }
    }
})

function showCarritoSave() {

    if(localStorage.getItem('cantCarrito') !== undefined && localStorage.getItem('cantCarrito')) {
        cantCarrito = JSON.parse(localStorage.getItem('cantCarrito'))
    }

    if(localStorage.getItem('precioCarrito') !== undefined && localStorage.getItem('precioCarrito')) {
        precioCarrito = JSON.parse(localStorage.getItem('precioCarrito'))
    }
    
    
    actualizarCarrito()

    compra.map( (compra) => {

        document.getElementById('cardsCarrito').innerHTML += `
                        <div class='cardCarrito' id="card-${compra.producto_id}">
                            <div class="izq">
                                <div class="img">
                                    <img src="${compra.img_url}" alt="Img">
                                </div>
                                <div class="infoPro">
                                    <h5>${compra.nombre}</h5>
                                    <p>${compra.descripcion}</p>
                                </div>
                                
                            </div>
                            <div class="med">
                                <i class='bx bxs-x-square' onclick="quitarCarrito(${compra.producto_id})"></i>
                            </div>
                            <div class="der">
                                <p>$<span id="precioCant-${compra.producto_id}">${formatear(`${compra.precio * compra.cantidad}`)}</span></p>
                                <input type="number" name="cantProd" id="cantProd-${compra.producto_id}" value="${compra.cantidad}" oninput="inputCant(${compra.producto_id})">
                                
                            </div>
                        </div>
                    `

    })

    
                    
}

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

function addCarrito(id) {

    if(compra.find(elemento => elemento.producto_id === id) === undefined) {
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
                    nombre: producto[0].nombre,
                    descripcion: producto[0].descripcion,
                    img_url: producto[0].img_url,
                    producto_id: producto[0].producto_id,
                    precio: producto[0].precio,
                    cantidad: 1
                }
                compra.push(i)
                cantCarrito += 1
                precioCarrito += producto[0].precio
                actualizarCarrito()
            })
    } else {
        compra[index(compra, id)].cantidad += 1
        cantCarrito += 1
        precioCarrito += compra[index(compra, id)].precio
        document.getElementById(`precioCant-${id}`).innerHTML = formatear(`${compra[index(compra, id)].precio * compra[index(compra, id)].cantidad}`)
        let j = document.getElementById(`cantProd-${id}`).value
        document.getElementById(`cantProd-${id}`).value = Number(j) + Number(1)
        actualizarCarrito()
    }

}

function actualizarCarrito() {
    document.getElementById('cant').innerHTML = cantCarrito
    document.getElementById('precioTotal').innerHTML = formatear(`${precioCarrito}`)
    document.getElementById('totalCarrito').innerHTML = formatear(`${precioCarrito}`)
    localStorage.clear()
    localStorage.setItem("carrito", JSON.stringify(compra))
    localStorage.setItem("cantCarrito", JSON.stringify(cantCarrito))
    localStorage.setItem("precioCarrito", JSON.stringify(precioCarrito))
}

const filtro = (lista, id) => {
    return lista.filter(elemento => elemento.producto_id !== id);
}
const index = (lista, id) => {
    let producto = {};

    producto = lista.find(elemento => elemento.producto_id === id);
    let i = lista.indexOf(producto)
    return i
}

function quitarCarrito(id) {
    document.getElementById(`card-${id}`).remove()
    
    cantCarrito -= compra[index(compra, id)].cantidad
    precioCarrito -= (compra[index(compra, id)].precio * compra[index(compra, id)].cantidad)

    compra = filtro(compra, id)
    actualizarCarrito()
}

function inputCant(id) {
    if(Number(document.getElementById(`cantProd-${id}`).value) === 0) {
        quitarCarrito(id)
    }else if(Number(document.getElementById(`cantProd-${id}`).value) >= 1) {
        if(Number(document.getElementById(`cantProd-${id}`).value) > Number(compra[index(compra, id)].cantidad)) {
            compra[index(compra, id)].cantidad += 1
            cantCarrito += 1
            precioCarrito += compra[index(compra, id)].precio
            document.getElementById(`precioCant-${id}`).innerHTML = formatear(`${compra[index(compra, id)].precio * compra[index(compra, id)].cantidad}`)
            actualizarCarrito()
        } else if(Number(document.getElementById(`cantProd-${id}`).value) < Number(compra[index(compra, id)].cantidad)) {
            compra[index(compra, id)].cantidad -= 1
            cantCarrito -= 1
            precioCarrito -= compra[index(compra, id)].precio
            document.getElementById(`precioCant-${id}`).innerHTML = formatear(`${compra[index(compra, id)].precio * compra[index(compra, id)].cantidad}`)
            actualizarCarrito()
        }
    }

}