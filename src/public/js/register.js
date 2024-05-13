
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

        if(data === 1){

            Swal.fire({
            icon: "success", 
            title: 'Se ha registrado correctamente',
            footer: '<button class="btt" ><a href="/login" >Iniciar sesión</a></button>',
            showConfirmButton: false    
            })
          setTimeout(function () {
            window.location = '/login'
          }, 3000)

        }else{

            Swal.fire({
                icon: "error", 
                title: data.error,
            })
            document.getElementById('submit').disabled = false

        }
        
    })
}

document.getElementById('submit').addEventListener('click', () => {
    
    let nombre = document.getElementById('nombre').value
    let apellido = document.getElementById('apellido').value
    let email =  document.getElementById('email').value
    let pass = document.getElementById('pass').value
    let pass1 = document.getElementById('pass1').value

    if(verificarInput()) {
        document.getElementById('submit').disabled = true
        postFetch(nombre, apellido, email, pass, image64)
    }
        

})

function validarEmail(email) {
    // Expresión regular para verificar el formato del email
    let patron = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Verificar si el email coincide con el patrón
    return patron.test(email);
}

function validarPass(pass) {

    let patron = /^[a-zA-Z0-9._%$&+-]{8,}$/;

    return patron.test(pass);
}

document.getElementById('cancelar').addEventListener('click', () => {

    document.getElementById('nombre').value = ''
    document.getElementById('apellido').value = ''
    document.getElementById('email').value = ''
    document.getElementById('pass').value = ''
    document.getElementById('pass1').value = ''
    document.getElementById('image').value = ''
    document.getElementById('imagePre').src = 'images/user.png'
    image64 = ''

})

function verificarInput() {
    if(document.getElementById('nombre').value !== ''){
        document.getElementById('nombre').style.borderColor = 'white'

        if(document.getElementById('apellido').value !== ''){
            document.getElementById('apellido').style.borderColor = 'white'

            if(validarEmail(document.getElementById('email').value)){
                document.getElementById('email').style.borderColor = 'white'

                if(validarPass(document.getElementById('pass').value)){
                    document.getElementById('password').style.borderColor = 'white'

                    if(document.getElementById('pass1').value !== '' && document.getElementById('pass1').value === document.getElementById('pass').value){
                        document.getElementById('password1').style.borderColor = 'white'

                        if(image64 !== ''){
                            return true

                        }else{
                            const posicionY = document.getElementById("image").getBoundingClientRect().top;
                            window.scroll(0, posicionY);
                            document.getElementById('errorImage').removeAttribute('style')
                            setTimeout(function () {
                            document.getElementById('errorImage').style.display = 'none'
                            }, 3000)
                            return false
                        }
                    }else{
                        document.getElementById('errorPass1').removeAttribute('style')
                        document.getElementById('password1').style.borderColor = 'red'
                        setTimeout(function () {
                        document.getElementById('errorPass1').style.display = 'none'
                        }, 3000)
                        return false
                    }
                }else{
                    document.getElementById('errorPass').removeAttribute('style')
                    document.getElementById('password').style.borderColor = 'red'
                    setTimeout(function () {
                    document.getElementById('errorPass').style.display = 'none'
                    }, 3000)
                    return false
                }
            }else{
                document.getElementById('errorEmail').removeAttribute('style')
                document.getElementById('email').style.borderColor = 'red'
                setTimeout(function () {
                    document.getElementById('errorEmail').style.display = 'none'
                }, 3000)
                return false
            }
        }else{
            document.getElementById('errorApellido').removeAttribute('style')
            document.getElementById('apellido').style.borderColor = 'red'
            setTimeout(function () {
                document.getElementById('errorApellido').style.display = 'none'
            }, 3000)
            return false
        }
    }else{
        document.getElementById('errorNombre').removeAttribute('style')
        document.getElementById('nombre').style.borderColor = 'red'
        setTimeout(function () {
            document.getElementById('errorNombre').style.display = 'none'
        }, 3000)
        return false
    }
}