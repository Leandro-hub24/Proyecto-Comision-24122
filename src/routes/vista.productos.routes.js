import {Router} from 'express'
import {getVistaProductos, postProducto, getProductoId} from '../controllers/vista.productos.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { renewTokenMiddleware } from '../middleware/renew.token.middleware.js'

const router = Router()

router.get('/productos', authMiddleware, renewTokenMiddleware, getVistaProductos)

router.get('/productosCarrito/:id', getProductoId)

router.post('/productos', postProducto)

export default router