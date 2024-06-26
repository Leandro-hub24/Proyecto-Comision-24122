import jwt from 'jsonwebtoken'
import { SECRET_KEY} from '../config.js'

export const authMiddleware = async (req, res, next) => {

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

    if(req.signedCookies['token']) {

        const token = req.signedCookies['token']

        try {
            const token1 = jwt.verify(token, SECRET_KEY);
            /* console.log(token1.exp);
            console.log(token1); */

            if (Date.now > token1.exp) {
                req.login = false
                res.clearCookie("token")
                next()
            } else {
                req.login = true;
                req.user = token1;
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