import {Router} from 'express'
import {getAdmin, getProductoId, postProducto, putProducto, getProductos, postAdmin, getProductosStock, deleteProducto} from '../controllers/admin.controller.js'
import { authLogin } from '../middleware/authLogin.js'

const router = Router()

router.get('/admin', authLogin, getAdmin)

router.post('/admin', authLogin, postAdmin)

router.get('/productos/:i', authLogin, getProductos)

router.get('/productos/stock/:i', authLogin, getProductosStock)

router.get('/admin/productos/:id', authLogin, getProductoId)

router.post('/admin/productos', authLogin, postProducto)

router.put('/admin/productos', authLogin, putProducto)

router.delete('/admin/productos', authLogin, deleteProducto)

router.put('/admin/pedidos',)


export default router