import {Router} from 'express'
import {getMiPerfil, putMiPerfil} from '../controllers/mi.perfil.controller.js'
import { authSession } from '../middleware/authSesion.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { renewTokenMiddleware } from '../middleware/renew.token.middleware.js'

const router = Router()

router.get('/mi-perfil', authMiddleware, renewTokenMiddleware, authSession, getMiPerfil)

router.put('/mi-perfil',authMiddleware, renewTokenMiddleware, authSession, putMiPerfil)

export default router