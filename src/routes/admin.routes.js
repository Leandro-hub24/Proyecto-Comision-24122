import {Router} from 'express'
import {getAdmin, getProductoId, postProducto, putProducto, getProductos, postAdmin, getProductosStock, deleteProducto} from '../controllers/admin.controller.js'

const router = Router()

router.get('/admin', getAdmin)

router.post('/admin', postAdmin)

router.get('/productos/:i', getProductos)

router.get('/productos/stock/:i', getProductosStock)

router.get('/admin/productos/:id', getProductoId)

router.post('/admin/productos', postProducto)

router.put('/admin/productos', putProducto)

router.delete('/admin/productos', deleteProducto)

router.put('/admin/pedidos', )


export default router