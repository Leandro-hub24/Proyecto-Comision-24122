
export const getMiPerfil = async (req, res) => {
    
    if(req.signedCookies['loggedin']){

        const usuarioSesion = {
            nombres: req.signedCookies['nombres'],
            apellidos: req.signedCookies['apellidos'],
            img_url: req.signedCookies['img_url'],
            rol: req.signedCookies['rol']
        }

        res.render('miPerfil', {
         login: true,
         id: req.signedCookies['idUser'],
         usuarioSesion
        })

    } else {

        res.redirect('/')
        
    } 
    

}