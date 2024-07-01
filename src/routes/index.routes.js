import {Router} from 'express'
import {getIndex} from '../controllers/index.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { renewTokenMiddleware } from '../middleware/renew.token.middleware.js'

const router = Router()

router.get('/', authMiddleware, renewTokenMiddleware, getIndex)

router.post('/',)

export default router