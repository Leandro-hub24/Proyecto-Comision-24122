import {Router} from 'express'
import {getVistaProductos, postProducto, getProductoId} from '../controllers/vista.productos.controller.js'
import { authSession } from '../middleware/authSesion.js'

const router = Router()

router.get('/productos', getVistaProductos)

router.get('/productosCarrito/:id', getProductoId)

router.post('/productos', postProducto)

export default router