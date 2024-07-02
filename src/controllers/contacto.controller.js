import { db } from '@vercel/postgres'

export const getContacto = async (req, res) => {

    if(req.login){
        const usuarioSesion = {
            nombres: req.user.nombres,
            apellidos: req.user.apellidos,
            img_url: req.user.img_url,
            rol: req.user.rol 
        }

        res.render('contacto', {
            login: true,
            id: req.user.idUser,
            usuarioSesion
        })
    } else {

        res.render('contacto', {
            login: false
            
        })
    } 

    

}

export const postContacto = async (req, res) => {

    /* if(req.signedCookies['loggedin']){
        const usuarioSesion = {
            nombres: req.signedCookies['nombres'],
            apellidos: req.signedCookies['apellidos'],
            img_url: req.signedCookies['img_url'],
            rol: req.signedCookies['rol']
        }

        res.render('contacto', {
         login: true,
         id: req.signedCookies['idUser'],
         usuarioSesion
        })
    } else {

        res.render('contacto', {
            login: false
            
        })
    }  */

    

}