import {Router} from 'express'
import {getContacto, postContacto} from '../controllers/contacto.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { renewTokenMiddleware } from '../middleware/renew.token.middleware.js'

const router = Router()

router.get('/contacto', authMiddleware, renewTokenMiddleware, getContacto)

router.post('/contacto', postContacto)


export default router