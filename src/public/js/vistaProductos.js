

let i = 0
document.getElementById('cargarMas').addEventListener('click', () => {

    let url = '/productos'
    let request = new Request(url, {
        method: 'POST',
        body: JSON.stringify({i}),
        headers: {
            /* "Content-Type": "multipart/form-data", */
            "Content-Type": "application/json",            
            /* "Content-Type": "application/x-www-form-urlencoded", */
        }, 
    });
    fetch(request)
    .then(response => response.json())
    .then( (data) => { 
        console.log(data) 
        data.map( (producto) => {
            document.getElementById('cards').innerHTML += `
            <div class="card">
                            <div class="img">
                                <img src="${producto.img_url}" alt="Img">
                            </div>
                            <h4>${producto.nombre}</h4>
                            <p>${producto.descripcion}</p>
                            <p>$<span>${producto.precio}</span></p>
                            <div class="acciones">
                                <button class="btt" onclick="addCarrito(${producto.producto_id})">Comprar</button>   
                            </div> 
            </div>
            
            `
        })
    })
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
                                <div class="imgC">
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
                                <input type="number" name="cantProd" id="cantProd-${producto[0].producto_id}" value="1" oninput="inputCant(${producto[0].producto_id})" onkeydown="return not(event)">
                                
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
 
function formatear(i) {
    const decimal = Number(i.replace(",", ".")).toFixed(2); //cambiamos la "," por el "." por si introduce un string con ","
    const formated = decimal.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return formated;
}
