
document.getElementById('imageUser').addEventListener('click', () => {
    if(document.getElementById('drop-down').classList.contains('show-drop-down')){
        document.getElementById('drop-down').classList.remove('show-drop-down')
    }else{
        document.getElementById('drop-down').classList.add('show-drop-down')
    }
})

document.getElementById('hamburger').addEventListener('click', () => {
    if(document.getElementById('drop-down1').classList.contains('show-drop-down1')){
        document.getElementById('drop-down1').classList.remove('show-drop-down1')
    }else{
        document.getElementById('drop-down1').classList.add('show-drop-down1')
    }
})