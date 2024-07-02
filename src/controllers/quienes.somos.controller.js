import { db } from '@vercel/postgres'

export const getQuienesSomos = async (req, res) => {

    if(req.login){
        const usuarioSesion = {
            nombres: req.user.nombres,
            apellidos: req.user.apellidos,
            img_url: req.user.img_url,
            rol: req.user.rol     
        }

        res.render('quienesSomos', {
         login: true,
         id: req.user.idUser,
         usuarioSesion
        })
    } else {

        res.render('quienesSomos', {
            login: false
            
        })
    } 

    

}