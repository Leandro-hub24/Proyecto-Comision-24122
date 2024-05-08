
function editarPerfil(){

}

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
    vaciarModal()
}

document.getElementById('fondoModal').addEventListener('click', function(event) {
    if (event.target === document.getElementById('fondoModal')) {
        cancelarForm()
    }
})

function editarPerfil(){
    document.getElementById('fondoModal').removeAttribute('style')
    document.getElementById('imagePrevia').innerHTML = `
    <img src="${document.getElementById('img_url').src}">
    `
    document.getElementById('nombre').value = document.getElementById('nombreUser').innerHTML
    document.getElementById('apellido').value = document.getElementById('apellidoUser').innerHTML
    document.getElementById('email').value = document.getElementById('emailUser').innerHTML

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