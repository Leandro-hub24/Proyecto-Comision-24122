import jwt from 'jsonwebtoken'
import { SECRET_KEY} from '../config.js'
import { db } from '@vercel/postgres'

export const authMiddleware = async (req, res, next) => {

    const client = await db.connect()
    /* const authHeader = req.headers['authorization'];

    if (!authHeader) return res.status(403).send({auth: false, message: 'No se proveyó un token'})

    const token = authHeader.split(' ')[1];
    
    if (!token) return res.status(403).send({auth: false, message: 'Malformed token'}) */
    
    /* const token = req.signedCookies['token'] */


    /* jwt.verify(token, SECRET_KEY, (err, decoded) => {
        
        if (err) return res.status(403).send({auth: false, message: 'Failed to authenticate token'});

        req.userId = decoded.idUser;

        next();
    }); */

    

    if(req.signedCookies['idUser']) {
        let sesion
        try {
            // Consulta SQL
            const consulta = `SELECT * FROM sesions WHERE usuario_id = ${req.signedCookies['idUser']}`;
            // Ejecutar la consulta
            sesion = await client.query(consulta);
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
                next()
            } else {
                req.login = true;
                req.user = token;
                next();
            }
            
        } catch (error) {
            return res.status(403).send({auth: false, message: error.message});
        };

    } else {
        req.login = false
        next()
    }
    
};