
document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault()
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

let flag1 = 0
document.getElementById('show1').addEventListener('click', () => {

    if(flag1 === 0){
        document.getElementById('show1').src = 'images/icons/hide-regular-24.png'
        flag1 += 1
        document.getElementById('pass1').setAttribute('type', 'text')
    }else{
        document.getElementById('show1').src = 'images/icons/show-regular-24.png'
        flag1 = 0
        document.getElementById('pass1').setAttribute('type', 'password')
    }
})


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
    document.getElementById('imagePre').src = objectURL

})

function postFetch(nombre, apellido, email, pass, image64) {
    const url = '/register';
    //agregar funcion para ver si los input estan vacios

    let form = {
        nombre,
        apellido,
        email,
        pass,
        image64
    }
    var request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
            "Content-Type": "application/json",
        },
    });
    fetch(request)
    .then(res => res.json())
    .then (data => {

        if(data.login){

            Swal.fire({
            icon: "success", 
            title: data.msg,
            footer: '<button class="btt" ><a href="/" >Home</a></button>',
            showConfirmButton: false    
            })
          setTimeout(function () {
            window.location = data.ruta
          }, 3000)

        }else{

            Swal.fire({
                icon: "error", 
                title: data.msg,
            })

        }
        
    })
}

document.getElementById('submit').addEventListener('click', () => {
    
    let nombre = document.getElementById('nombre').value
    let apellido = document.getElementById('apellido').value
    let email =  document.getElementById('email').value
    let pass = document.getElementById('pass').value
    let pass1 = document.getElementById('pass1').value

    if( nombre !== '' && apellido !== '' && email !== '' && pass !== '' && pass1 !== '' && image64 !== '') {

        if(pass === pass1){
            postFetch(nombre, apellido, email, pass, image64)
        }else{
            Swal.fire({
                icon: "error", 
                title: 'Las contraseñas no coinciden',
            })
        }
        

    }else{
        Swal.fire({
            icon: "error", 
            title: 'Complete todo el formulario antes de enviar',
        })
    }

})

