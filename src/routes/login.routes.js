import {Router} from 'express'
import {getLogin, postLogin} from '../controllers/login.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = Router()

router.get('/login', authMiddleware, getLogin)

router.post('/login', postLogin)

export default router