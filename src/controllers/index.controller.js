import { db } from '@vercel/postgres'

export const getIndex = async (req, res) => {

    if(req.signedCookies['loggedin']){
        const usuarioSesion = {
            nombres: req.signedCookies['nombres'],
            apellidos: req.signedCookies['apellidos'],
        }

        res.render('index', {
         login: true,
         id: req.signedCookies['idUser'],
         usuarioSesion,
         index: true
        })
    } else {
        res.render('index', {
            login: false
        })
    } 

    

}