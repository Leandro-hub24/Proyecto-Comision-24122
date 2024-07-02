import {Router} from 'express'
import {getRegister, postRegister} from '../controllers/register.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { registerMiddleware } from '../middleware/register.middleware.js'

const router = Router()

router.get('/register', authMiddleware, registerMiddleware, getRegister)

router.post('/register', authMiddleware, registerMiddleware, postRegister)

export default router