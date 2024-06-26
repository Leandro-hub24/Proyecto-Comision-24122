import {Router} from 'express'
import {getIndex} from '../controllers/index.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const router = Router()

router.get('/', authMiddleware, getIndex)

router.post('/',)

export default router