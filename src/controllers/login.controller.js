import { db } from '@vercel/postgres'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { SECRET_KEY, TOKEN_EXPIRES_IN } from '../config.js'

export const getLogin = async (req, res) => {
    
    if(req.signedCookies['loggedin']){

        res.redirect('/')

    } else {
        
        res.render('login', {
            login: false
        })
    } 
    

}

export const postLogin = async (req, res) => {
    const {email, pass} = req.body
    const client = await db.connect()

    try {

        const {rows} = await client.sql`SELECT * FROM usuarios_1 WHERE email = ${email};`;
        if(rows.length === 0){

            res.status(200).json({msg: 'Email no registrado', login: false})

        }else{

            /* console.log(rows[0]) */

            if(typeof rows[0] ==='undefined' || !(await bcryptjs.compare(pass, rows[0].pass))){
                res.status(200).json({msg: 'Contraseña incorrecta', login: false})       
            }else{

                res.cookie('loggedin', true, { maxAge: 900000, httpOnly: true, secure: true, signed: true })
                res.cookie('idUser', rows[0].usuario_id, { maxAge: 900000, httpOnly: true, secure: true, signed: true })
                res.cookie('nombres', rows[0].nombre, { maxAge: 900000, httpOnly: true, secure: true, signed: true })
                res.cookie('apellidos', rows[0].apellido, { maxAge: 900000, httpOnly: true, secure: true, signed: true })
                res.cookie('img_url', rows[0].img_url, { maxAge: 900000, httpOnly: true, secure: true, signed: true})
                res.cookie('rol', rows[0].rol, { maxAge: 900000, httpOnly: true, secure: true, signed: true})
                const token = jwt.sign({loggedin: true, idUser: rows[0].usuario_id, nombres: rows[0].nombre, apellidos: rows[0].apellido, img_url: rows[0].img_url, rol: rows[0].rol}, SECRET_KEY, {expiresIn: TOKEN_EXPIRES_IN})
                res.cookie('token', token, { maxAge: 900000, httpOnly: true, secure: true, signed: true})
                res.status(200).json({
                    msg: 'Ha iniciado sesión correctamente',
                    login: true,
                    token
                })
            }

        }
        

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({
            msg: 'Error al iniciar sesión',
            login: false
        })
        
    }
}