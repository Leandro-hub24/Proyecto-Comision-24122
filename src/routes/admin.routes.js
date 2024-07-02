import {Router} from 'express'
import {getAdmin, getProductoId, postProducto, putProducto, getProductos, postAdmin, getProductosStock, deleteProducto} from '../controllers/admin.controller.js'
import { authLogin } from '../middleware/authLogin.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { renewTokenMiddleware } from '../middleware/renew.token.middleware.js'

const router = Router()

router.get('/admin', authMiddleware, renewTokenMiddleware, authLogin, getAdmin)

router.post('/admin', authMiddleware, renewTokenMiddleware, authLogin, postAdmin)

router.get('/productos/:i', authMiddleware, renewTokenMiddleware, authLogin, getProductos)

router.get('/productos/stock/:i', authMiddleware, renewTokenMiddleware, authLogin, getProductosStock)

router.get('/admin/productos/:id', authMiddleware, renewTokenMiddleware, authLogin, getProductoId)

router.post('/admin/productos', authMiddleware, renewTokenMiddleware, authLogin, postProducto)

router.put('/admin/productos', authMiddleware, renewTokenMiddleware, authLogin, putProducto)

router.delete('/admin/productos', authMiddleware, renewTokenMiddleware, authLogin, deleteProducto)

router.put('/admin/pedidos',)


export default router