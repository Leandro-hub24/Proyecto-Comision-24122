
function editarPerfil(){

}

document.getElementById('formModal').addEventListener('submit', function(event) {
    event.preventDefault()
})

document.getElementById('formModal1').addEventListener('submit', function(event) {
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
    vaciarModal()
}

function cancelarForm1(){
    document.getElementById('fondoModal1').style.display = 'none'
    vaciarModal()
}

document.getElementById('fondoModal').addEventListener('click', function(event) {
    if (event.target === document.getElementById('fondoModal')) {
        cancelarForm()
    }
})

document.getElementById('fondoModal1').addEventListener('click', function(event) {
    if (event.target === document.getElementById('fondoModal1')) {
        cancelarForm1()
    }
})

function editarPerfil(){
    document.getElementById('fondoModal').removeAttribute('style')
    document.getElementById('imagePrevia').innerHTML = `
    <img src="${document.getElementById('img_url').src}">
    `
    document.getElementById('nombre').value = document.getElementById('nombreUser').innerHTML.trim()
    document.getElementById('apellido').value = document.getElementById('apellidoUser').innerHTML.trim()
    document.getElementById('email').value = document.getElementById('emailUser').innerHTML.trim()

}

function vaciarModal(){
    document.getElementById('nombre').value = ''
    document.getElementById('apellido').value = ''
    document.getElementById('email').value = ''
    document.getElementById('image').value = ''
    image64 = ''
}

function guardarForm(){  

    let nombre = document.getElementById('nombre').value
    let apellido = document.getElementById('apellido').value
    let email = document.getElementById('email').value


    if( nombre !== '' && apellido !== '' && email !== '' ){

        if(image64 !== '') {
            let user = {
            nombre,
            apellido,
            email,
            image64
            }
            putForm(user)
            cancelarForm() 
        }else{
            let user = {
                nombre,
                apellido,
                email
            }
            putForm(user)
            cancelarForm()
        }
        
        
    }
}

function putForm(user){
    document.getElementById('editar').disabled = true
    let url = '/mi-perfil'
    let request = new Request(url, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",            
        }, 
    });
    fetch(request)
    .then(response => response.json())
    .then( (data) => {
        if(data === 1){
            console.log('Se ha editado correctamente')
            Swal.fire({
                icon: "success", 
                title: 'Se ha actualizado correctamente',
                showConfirmButton: false    
                })
              setTimeout(function () {
                window.location = '/mi-perfil'
              }, 1500)
        }else if(data.error){
            console.log('No se ha editado el producto')
            Swal.fire({
                icon: "error", 
                title: data.msg,  
                })
        }
    })
}

function eliminarPerfil() {
    document.getElementById('fondoModal1').removeAttribute('style')
}

document.getElementById('eliminar').addEventListener('click', () => {
    let pass = document.getElementById('pass').value
    if(pass === ''){
        Swal.fire({
            icon: "error", 
            title: 'Ingrese su contraseña', 
            })
    } else {
        document.getElementById('eliminar').disabled = true
        let url = '/mi-perfil/eliminar'
        let request = new Request(url, {
            method: 'DELETE',
            body: JSON.stringify({pass: pass}),
            headers: {
                "Content-Type": "application/json",            
            }, 
        });
        fetch(request)
        .then(response => response.json())
        .then( (data) => {
            console.log(data)
            if(data.msg){
                Swal.fire({
                    icon: "success", 
                    title: 'Se ha eliminado correctamente',
                    showConfirmButton: false    
                    })
                setTimeout(function () {
                    window.location = '/'
                }, 1500)
            }else if(data.error){
                Swal.fire({
                    icon: "error", 
                    title: data.error.replace('Error: ', ''),  
                    })
                    document.getElementById('eliminar').disabled = false    
            }
        })
    }
})

let flag = 0
document.getElementById('show').addEventListener('click', () => {

    if(flag === 0){
        document.getElementById('show').src = 'images/icons/hide-regular-24.png'
        flag += 1
        document.getElementById('pass').setAttribute('type', 'text')
    }else{
        document.getElementById('show').src = 'images/icons/show-regular-24.png'
        flag = 0
        document.getElementById('pass').setAttribute('type', 'password')
    }
})