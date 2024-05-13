document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault()
})

function validarEmail(email) {
    // Expresión regular para verificar el formato del email
    var patron = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Verificar si el email coincide con el patrón
    return patron.test(email);
}

document.getElementById('submit').addEventListener('click', () => {
    if(validarEmail(document.getElementById('email').value)){
        document.getElementById('email').style.borderColor = 'white'
        if(document.getElementById('consulta').value !== ''){
            document.getElementById('consulta').style.borderColor = 'white'
            document.getElementById('submit').disabled = true
            
        }else{
            /* Swal.fire({
                icon: "error", 
                title: 'Inserte una contraseña valida',
            }) */
            document.getElementById('errorConsulta').removeAttribute('style')
            document.getElementById('consulta').style.borderColor = 'red'
            setTimeout(function () {
                document.getElementById('errorConsulta').style.display = 'none'
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