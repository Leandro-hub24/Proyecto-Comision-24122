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
                            </div>
            </div>
            
            `
        })
    })
})