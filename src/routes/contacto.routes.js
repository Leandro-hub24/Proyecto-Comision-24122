import {Router} from 'express'
import {getContacto, postContacto} from '../controllers/contacto.controller.js'

const router = Router()

router.get('/contacto', getContacto)

router.get('/contacto', postContacto)


export default router