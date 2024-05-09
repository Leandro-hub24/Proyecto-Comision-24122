import { db } from '@vercel/postgres'

export const getQuienesSomos = async (req, res) => {

    if(req.signedCookies['loggedin']){
        const usuarioSesion = {
            nombres: req.signedCookies['nombres'],
            apellidos: req.signedCookies['apellidos'],
            img_url: req.signedCookies['img_url'],
            rol: req.signedCookies['rol']
        }

        res.render('quienesSomos', {
         login: true,
         id: req.signedCookies['idUser'],
         usuarioSesion
        })
    } else {

        res.render('quienesSomos', {
            login: false
            
        })
    } 

    

}