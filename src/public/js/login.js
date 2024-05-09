
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
    if(document.getElementById('email').value !== ''){
        if(document.getElementById('pass').value !== ''){
            document.getElementById('submit').disabled = 'true'
            postFetch()
        }else{
            Swal.fire({
                icon: "error", 
                title: 'Inserte una contraseña valida',
            })
        }
    }else{
        Swal.fire({
            icon: "error", 
            title: 'Inserte un email valido',
        })
    }
    
})