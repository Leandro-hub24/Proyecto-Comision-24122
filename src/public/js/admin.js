document.getElementById('formModal').addEventListener('submit', function(event) {
    event.preventDefault()
})

let element
let image 
let image64 = ''
document.getElementById('image').addEventListener('change', () => {
    image = document.getElementById('image').files[0]
    let reader= new FileReader();
    reader.readAsDataURL(image);
    reader.onload=()=>{
        //aqui ya esta en base64
        image64 = reader.result;
    }
    objectURL = URL.createObjectURL(image)
    document.getElementById('imagePrevia').innerHTML = `
    <img src="${objectURL}">
    `
})

function cancelarForm(){
    document.getElementById('fondoModal').style.display = 'none'
    document.getElementById('guardar').style.display = 'none'
    document.getElementById('editar').style.display = 'none'
    vaciarModal()
}

document.getElementById('fondoModal').addEventListener('click', function(event) {
    if (event.target === document.getElementById('fondoModal')) {
        cancelarForm()
    }
})

function editarProducto(id){
    let url = `/admin/productos/${id}`
    fetch(url)
    .then(res => res.json())
    .then( (data) => {  
        document.getElementById('nombre').value = data[0].nombre
        document.getElementById('descripcion').value = data[0].descripcion
        document.getElementById('precio').value = data[0].precio
        document.getElementById('stock').value = data[0].stock
        document.getElementById('producto_id').value = data[0].producto_id
        document.getElementById('fondoModal').removeAttribute('style')
        document.getElementById('editar').removeAttribute('style')
        let element = document.createElement('img')
        element.src = data[0].img_url
        document.getElementById('imagePrevia').innerHTML = ''
        document.getElementById('imagePrevia').appendChild(element)
    })

    
}

function vaciarModal(){
    document.getElementById('nombre').value = ''
    document.getElementById('descripcion').value = ''
    document.getElementById('precio').value = ''
    document.getElementById('stock').value = ''
    document.getElementById('producto_id').value = ''
    document.getElementById('image').value = ''
    document.getElementById('imagePrevia').innerHTML = 'Buscar una imagen'
    image64 = ''
}

function agregarProducto(){
    document.getElementById('fondoModal').removeAttribute('style')
    document.getElementById('guardar').removeAttribute('style')
}

function guardarForm(){  

    let nombre = document.getElementById('nombre').value
    let descripcion = document.getElementById('descripcion').value
    let precio = document.getElementById('precio').value
    let stock = document.getElementById('stock').value
    let producto_id = document.getElementById('producto_id').value


    if( nombre !== '' && descripcion !== '' && precio !== '' && stock !== '' && image64 !== '' ){

        let producto = {
            nombre,
            descripcion,
            precio,
            stock,
            image64
        }
        postForm(producto)
        cancelarForm()
    }
}

function postForm(producto){
    let url = '/admin/productos'
    let request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(producto),
        headers: {
            /* "Content-Type": "multipart/form-data", */
            "Content-Type": "application/json",            
            /* "Content-Type": "application/x-www-form-urlencoded", */
        }, 
    });
    fetch(request)
    .then(response => response.json())
    .then( (data) => {
        if(data === 1){
            console.log('Se ha agregado correctamente')
            actualizarCards()
        }else if(data.error){
            console.log('No se ha agregado el producto')
        }
    })
}


function editarForm(){

    let nombre = document.getElementById('nombre').value
    let descripcion = document.getElementById('descripcion').value
    let precio = document.getElementById('precio').value
    let stock = document.getElementById('stock').value
    let producto_id = document.getElementById('producto_id').value



    if( nombre !== '' && descripcion !== '' && precio !== '' && stock !== '' && producto_id !== '' ){

        if(image64 === ''){

            let producto = {
            nombre,
            descripcion,
            precio,
            stock,
            image64: '',
            producto_id
            }
            putForm(producto)

            cancelarForm()

        }else{

            let producto = {
                nombre,
                descripcion,
                precio,
                stock,
                image64,
                producto_id
            }
            putForm(producto)
    
            cancelarForm()

        }    
    }
}

function putForm(producto){
    let url = '/admin/productos'
    let request = new Request(url, {
        method: 'PUT',
        body: JSON.stringify(producto),
        headers: {
            /* "Content-Type": "multipart/form-data", */
            "Content-Type": "application/json",            
            /* "Content-Type": "application/x-www-form-urlencoded", */
        }, 
    });
    fetch(request)
    .then(response => response.json())
    .then( (data) => {
        if(data === 1){
            console.log('Se ha editado correctamente')
            actualizarCards()
        }else if(data.error){
            console.log('No se ha editado el producto')
        }
    })
}

function actualizarCards(){
    let url = `/productos/${i+8}`
    let request = new Request(url, {
        method: 'GET',
    });
    fetch(request)
    .then(response => response.json())
    .then( (data) => {
        document.getElementById('cStock').innerHTML = data.stock
        document.getElementById('sStock').innerHTML = data.sinStock
        document.getElementById('todos').innerHTML = data.productos.length
        document.getElementById('cards').innerHTML = ''
        data.productos.map( (producto) => {
            document.getElementById('cards').innerHTML += `
            <div class="card">
                            <div class="img">
                                <img src="${producto.img_url}" alt="Img">
                            </div>
                            <h4>${producto.nombre}</h4>
                            <p>${producto.descripcion}</p>
                            <p>$<span>${producto.precio}</span></p>
                            <p>Stock: <span>${producto.stock}</span></p>
                            <div class="acciones">
                                <span class="material-symbols-outlined" onclick="editarProducto(${producto.producto_id})" >
                                    edit
                                </span>
                                <span class="material-symbols-outlined" onclick="eliminarProducto(${producto.producto_id})">
                                    delete
                                </span>
                            </div>
            </div>
            
            `
        }) 

    })

}

let i = 0
document.getElementById('cargarMas').addEventListener('click', () => {

    let url = '/admin'
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
        document.getElementById('cStock').innerHTML = (parseInt(data.stock) /* + parseInt(document.getElementById('cStock').innerHTML) */)
        document.getElementById('sStock').innerHTML = (parseInt(data.sinStock) /* + parseInt(document.getElementById('sStock').innerHTML) */)
        document.getElementById('todos').innerHTML = (data.productos.length /* + parseInt(document.getElementById('todos').innerHTML) */)
        data.productos.map( (producto) => {
            document.getElementById('cards').innerHTML += `
            <div class="card">
                            <div class="img">
                                <img src="${producto.img_url}" alt="Img">
                            </div>
                            <h4>${producto.nombre}</h4>
                            <p>${producto.descripcion}</p>
                            <p>$<span>${producto.precio}</span></p>
                            <p>Stock: <span>${producto.stock}</span></p>
                            <div class="acciones">
                                <span class="material-symbols-outlined" onclick="editarProducto(${producto.producto_id})" >
                                    edit
                                </span>
                                <span class="material-symbols-outlined" onclick="eliminarProducto(${producto.producto_id})">
                                    delete
                                </span>
                            </div>
            </div>
            
            `
        })
    })
})

function filtrarStock(i){

    let url = `/productos/stock/${i}`
    let request = new Request(url, {
        method: 'GET',
    });
    fetch(request)
    .then(response => response.json())
    .then( (data) => {
        document.getElementById('cards').innerHTML = ''
        data.map( (producto) => {
            document.getElementById('cards').innerHTML += `
            <div class="card">
                            <div class="img">
                                <img src="${producto.img_url}" alt="Img">
                            </div>
                            <h4>${producto.nombre}</h4>
                            <p>${producto.descripcion}</p>
                            <p>$<span>${producto.precio}</span></p>
                            <p>Stock: <span>${producto.stock}</span></p>
                            <div class="acciones">
                                <span class="material-symbols-outlined" onclick="editarProducto(${producto.producto_id})" >
                                    edit
                                </span>
                                <span class="material-symbols-outlined" onclick="eliminarProducto(${producto.producto_id})">
                                    delete
                                </span>
                            </div>
            </div>
            
            `
        }) 

    })

}

function eliminarProducto(id){

    let url = `/admin/productos`
    let request = new Request(url, {
        method: 'DELETE',
        body: JSON.stringify({id}),
        headers: {
            /* "Content-Type": "multipart/form-data", */
            "Content-Type": "application/json",            
            /* "Content-Type": "application/x-www-form-urlencoded", */
        }, 
    });
    fetch(request)
    .then(response => response.json())
    .then( (data) => {
        if(data === 1){
            console.log('Se ha eliminado correctamente')
            actualizarCards()
        }else if(data.error){
            console.log('No se ha eliminado el producto')
        }

    })

}