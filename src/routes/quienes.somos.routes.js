import {Router} from 'express'
import {getQuienesSomos} from '../controllers/quienes.somos.controller.js'

const router = Router()

router.get('/quienes-somos', getQuienesSomos)


export default router