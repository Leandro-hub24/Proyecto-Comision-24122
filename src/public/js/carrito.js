let compra = new Array
let cantCarrito = 0
let precioCarrito = 0

window.addEventListener('load', () => {
    if(localStorage){
        if(localStorage.getItem('carrito') !== undefined && localStorage.getItem('carrito')){
            compra = JSON.parse(localStorage.getItem('carrito'))
            if(compra !== ''){
                showCarritoSave()
            }
            
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
                                <div class="imgC">
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
                                <div class="inputPro">
                                    <i class='bx bx-minus mp' onclick="minus(${compra.producto_id})"></i>
                                    <input type="number" name="cantProd-${compra.producto_id}" id="cantProd-${compra.producto_id}" value="${compra.cantidad}" oninput="inputCant(${compra.producto_id})" onkeydown="return not(event)">
                                    <i class='bx bx-plus mp mp1' onclick="plus(${compra.producto_id})" ></i>
                                </div>
                                
                            </div>
                        </div>
                    `

    })

    
                    
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

function not(event) {
    event.preventDefault()
    return false
}

/* function inputCant(id) {
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

} */

function minus(id) {
    compra[index(compra, id)].cantidad -= 1
    document.getElementById(`cantProd-${id}`).setAttribute("value", compra[index(compra, id)].cantidad)
    cantCarrito -= 1
    precioCarrito -= compra[index(compra, id)].precio
    document.getElementById(`precioCant-${id}`).innerHTML = formatear(`${compra[index(compra, id)].precio * compra[index(compra, id)].cantidad}`)     
    actualizarCarrito()
    if(Number(document.getElementById(`cantProd-${id}`).value) === 0) {
        quitarCarrito(id)
    }
}

function plus(id) {
    compra[index(compra, id)].cantidad += 1
    document.getElementById(`cantProd-${id}`).setAttribute("value", compra[index(compra, id)].cantidad)
    cantCarrito += 1
    precioCarrito += compra[index(compra, id)].precio
    document.getElementById(`precioCant-${id}`).innerHTML = formatear(`${compra[index(compra, id)].precio * compra[index(compra, id)].cantidad}`)
    actualizarCarrito()
}

function submitSS() {

    if(compra.length === 0) {
        Swal.fire({
            icon: "warning", 
            title: "El carrito se encuentra vacio"    
            })
    } else {
        Swal.fire({
        icon: "warning", 
        title: "Debe iniciar sesión para poder realizar la compra",
        footer: '<button class="btt" ><a href="/login" >Iniciar sesión</a></button>',
        showConfirmButton: false    
    })
    }
    
}

function submit() {

    if(compra.length === 0) {
        Swal.fire({
            icon: "warning", 
            title: "El carrito se encuentra vacio"    
            })
    } else {
        const url = '/compras';

        var request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(compra),
            headers: {
                "Content-Type": "application/json",
            },
        });
        fetch(request)
        .then(res => res.json())
        .then (data => {
            if(data.message){
                Swal.fire({
                icon: "success", 
                title: data.message   
                })
                document.getElementById('cardsCarrito').innerHTML = ''
                compra = []
                cantCarrito = 0
                precioCarrito = 0
                actualizarCarrito()
            } else {
                Swal.fire({
                    icon: "success", 
                    title: data.error   
                    })
            }
            
        })
    
    }

}    