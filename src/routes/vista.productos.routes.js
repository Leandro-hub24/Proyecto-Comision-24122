import {Router} from 'express'
import {getVistaProductos, postProducto} from '../controllers/vista.productos.controller.js'
import { authSession } from '../middleware/authSesion.js'

const router = Router()

router.get('/productos', getVistaProductos)

router.post('/productos', postProducto)

export default router