import { db } from '@vercel/postgres'

export const getLogin = async (req, res) => {

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
        res.render('login', {
            login: false
        })
    } 

    

}

export const postLogin = async (req, res) => {
    const {email, pass} = req.body
    /* let passwordHaash = await bcryptjs.hash(pass, 8) */
    const client = await db.connect()

    try {

        const {rows} = await client.sql`SELECT * FROM usuarios WHERE correo_electronico = ${email};`;
        if(rows.length === 0){

            res.status(200).json({msg: 'Email no registrado', login: false})

        }else{

            console.log(rows[0])

            if(typeof rows[0] ==='undefined' || !(await bcryptjs.compare(pass, rows[0].pass))){
                res.status(200).json({msg: 'Contraseña incorrecta', login: false})       
            }else{

                res.cookie('loggedin', true, { maxAge: 900000, httpOnly: true, secure: true, signed: true })
                res.cookie('idUser', rows[0].usuario_id, { maxAge: 900000, httpOnly: true, secure: true, signed: true })
                res.cookie('nombres', rows[0].nombre, { maxAge: 900000, httpOnly: true, secure: true, signed: true })
                res.cookie('apellidos', rows[0].apellido, { maxAge: 900000, httpOnly: true, secure: true, signed: true })
                res.cookie('img_url', rows[0].img_url, { maxAge: 900000, httpOnly: true, secure: true, signed: true})
                res.cookie('rol', rows[0].rol, { maxAge: 900000, httpOnly: true, secure: true, signed: true})

                res.status(200).json({
                    ruta: '/',
                    msg: 'Ha iniciado sesión correctamente',
                    login: true
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