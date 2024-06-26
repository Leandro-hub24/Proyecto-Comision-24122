import jwt from 'jsonwebtoken'
import { SECRET_KEY} from '../config.js'

export const authMiddleware = async (req, res, next) => {

    /* const authHeader = req.headers['authorization'];

    if (!authHeader) return res.status(403).send({auth: false, message: 'No se proveyó un token'})

    const token = authHeader.split(' ')[1];
    
    if (!token) return res.status(403).send({auth: false, message: 'Malformed token'}) */
    
    const token = req.signedCookies['token']
    console.log(token)

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        
        if (err) return res.status(403).send({auth: false, message: 'Failed to authenticate token'});

        req.userId = decoded.idUser;

        next();
    });    

};