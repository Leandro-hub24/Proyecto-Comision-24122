import jwt from 'jsonwebtoken'
import { SECRET_KEY, TOKEN_EXPIRES_IN} from '../config.js'
import { db } from '@vercel/postgres'

export const renewTokenMiddleware = async (req, res, next) => {
    const client = await db.connect()
    if(req.user) {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        console.log(currentTimestamp)
        console.log(req.user.exp)
        console.log(req.user.exp - currentTimestamp)
        console.log(((60*60)*0.5))

        if ((req.user.exp - currentTimestamp) <= (((60*60)*0.5))) {

            try {

                const token = jwt.sign({loggedin: true, idUser: req.user.idUser, nombres: req.user.nombres, apellidos: req.user.apellidos, img_url: req.user.img_url, rol: req.user.rol}, SECRET_KEY, {expiresIn: TOKEN_EXPIRES_IN})
                res.cookie('idUser', req.user.idUser, { maxAge: (((60*1000)*60)*2), httpOnly: true, secure: true, signed: true })

                const query1 = {
                text: `UPDATE sesions SET sesion = $1 WHERE usuario_id = $2`,
                values: [
                    token,
                    req.user.idUser
                ],
                };
                
                // Ejecutar la consulta
                const insertUser = await client.query(query1)
                console.log('Filas afectadas:', insertUser.rowCount);  
            } catch (error) {
                console.error('Error al actualizar sesión:', error);
                res.status(500).json({ error: 'Error al actualizar la sesión' });
            }
            next()
        } else {
            next();
        }
    } else {
        next()
    }
    
}