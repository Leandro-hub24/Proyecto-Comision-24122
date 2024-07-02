import jwt from 'jsonwebtoken'
import { SECRET_KEY} from '../config.js'
import { db } from '@vercel/postgres'

export const authMiddleware = async (req, res, next) => {

    const client = await db.connect()  
    try {
        if(req.signedCookies['idUser']) {
            let sesion
            try {
                // Utilizar consulta preparada
                const consulta = 'SELECT * FROM sesions WHERE usuario_id = $1';
                // Ejecutar la consulta
                sesion = await client.query(consulta, [req.signedCookies['idUser']]);
            } catch (error) {
                console.error('Error al consultar la sesión:', error);
                res.status(500).json({ error: 'Error al consultar la sesión' });
            }

            try {
                const token = jwt.verify(sesion.rows[0].sesion, SECRET_KEY);
                //console.log(token.exp);
                //console.log(token);
                const currentTimestamp = Math.floor(Date.now() / 1000);
                
                if (currentTimestamp >= token.exp) {
                    req.login = false
                    res.clearCookie("idUser")
                } else {
                    req.login = true;
                    req.user = token;
                }
                
            } catch (error) {
                return res.status(403).send({auth: false, message: error.message});
            };

        } else {
            req.login = false
        }
    } catch (error) {
        console.error('Error en el middleware de autenticación:', error);
        return res.status(500).json({ error: 'Error en el middleware de autenticación' });
    } finally {
        client.release();
    }
    

    next();
    
};