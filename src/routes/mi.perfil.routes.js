import {Router} from 'express'
import {getMiPerfil, putMiPerfil} from '../controllers/mi.perfil.controller.js'
import { authSession } from '../middleware/authSesion.js'

const router = Router()

router.get('/mi-perfil', authSession, getMiPerfil)

router.put('/mi-perfil',authSession, putMiPerfil)

export default router