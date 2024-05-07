import {Router} from 'express'
import {getMiPerfil} from '../controllers/mi.perfil.controller.js'

const router = Router()

router.get('/mi-perfil', getMiPerfil)

router.post('/mi-perfil',)

export default router