import {Router} from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { renewTokenMiddleware } from '../middleware/renew.token.middleware.js'
import { authSession } from '../middleware/authSesion.js'
import { authLogin } from '../middleware/authLogin.js'
import { getComprasID, postCompras } from '../controllers/compras.controller.js'

const router = Router()

router.get('/compras', authMiddleware, renewTokenMiddleware, authLogin, getCompras)

router.get('/compras/:id', authMiddleware, renewTokenMiddleware, authSession, getComprasID)

router.post('/compras', authMiddleware, renewTokenMiddleware, authSession, postCompras)


export default router