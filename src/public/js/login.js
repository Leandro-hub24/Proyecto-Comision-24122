
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

function validarEmail(email) {
    // Expresión regular para verificar el formato del email
    var patron = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Verificar si el email coincide con el patrón
    return patron.test(email);
}

function postFetch() {

    //agregar funcion para ver si los input estan vacios

    const url = '/login';
        let form = {
        email: document.getElementById('email').value,
        pass: document.getElementById('pass').value
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
                window.location = '/'
            }, 3000)

            }else{

                Swal.fire({
                    icon: "error", 
                    title: data.msg,
                })

            }
            
        })


    
}

function registro(){
    window.location = '/register'
}

document.getElementById('submit').addEventListener('click', () => {
    if(validarEmail(document.getElementById('email').value)){
        document.getElementById('email').style.borderColor = 'white'
        if(document.getElementById('pass').value !== ''){
            document.getElementById('password').style.borderColor = 'white'
            document.getElementById('submit').disabled = true
            postFetch()
        }else{
            /* Swal.fire({
                icon: "error", 
                title: 'Inserte una contraseña valida',
            }) */
            document.getElementById('errorPass').removeAttribute('style')
            document.getElementById('password').style.borderColor = 'red'
            setTimeout(function () {
                document.getElementById('errorPass').style.display = 'none'
            }, 3000)

        }
    }else{
        /* Swal.fire({
            icon: "error", 
            title: 'Inserte un email valido',
        }) */
        document.getElementById('errorEmail').removeAttribute('style')
        document.getElementById('email').style.borderColor = 'red'
        setTimeout(function () {
            document.getElementById('errorEmail').style.display = 'none'
        }, 3000)
    }
    
})