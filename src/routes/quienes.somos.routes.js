import {Router} from 'express'
import {getQuienesSomos} from '../controllers/quienes.somos.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { renewTokenMiddleware } from '../middleware/renew.token.middleware.js'

const router = Router()

router.get('/quienes-somos', authMiddleware, renewTokenMiddleware, getQuienesSomos)


export default router