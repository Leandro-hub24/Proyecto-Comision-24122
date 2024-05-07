import { db } from '@vercel/postgres'

export const getIndex = async (req, res) => {

    if(req.signedCookies['loggedin']){
        const usuarioSesion = {
            nombres: req.signedCookies['nombres'],
            apellidos: req.signedCookies['apellidos'],
            img_url: req.signedCookies['img_url'],
            rol: req.signedCookies['rol']
        }

        res.render('index', {
         login: true,
         id: req.signedCookies['idUser'],
         usuarioSesion
        })
    } else {

        res.render('index', {
            login: false
            
        })
    } 

    

}