
document.getElementById('imageUser').addEventListener('click', () => {
    if(document.getElementById('drop-down').classList.contains('show-drop-down')){
        document.getElementById('drop-down').classList.remove('show-drop-down')
    }else{
        document.getElementById('drop-down').classList.add('show-drop-down')
    }
})