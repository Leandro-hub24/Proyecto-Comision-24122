import { db } from '@vercel/postgres'

export const getVistaProductos = async (req, res) => {

    const client = await db.connect()
    let productos
    let pedidos  

    try {
    
        // Consulta SQL
        const consulta = 'SELECT * FROM productos WHERE stock > 0 ORDER BY nombre  LIMIT 8 OFFSET 0 ';
        // Ejecutar la consulta
        const resultado = await client.query(consulta);;
    
        

        console.log('Productos:', resultado.rows); // Imprimir los resultados

        productos = resultado.rows


          if(req.login){
            const usuarioSesion = {
              nombres: req.user.nombres,
              apellidos: req.user.apellidos,
              img_url: req.user.img_url,
              rol: req.user.rol       
            }
    
            res.render('vistaProductos', {
             login: true,
             id: req.user.idUser,
             usuarioSesion,
             productos
            })
        } else {
    
            res.render('vistaProductos', {
                login: false,
                productos   
            })
        } 

      } catch (error) {
        console.error('Error al consultar productos:', error);
        res.status(500).json({ error: 'Error al consultar productos' });
      }

}

export const postProducto = async (req, res) => {
  const client = await db.connect()
  let productos
  const {i} = req.body

  try {
  
      // Consulta SQL
      const consulta = `SELECT * FROM productos WHERE stock > 0 ORDER BY nombre LIMIT 8 OFFSET ${i}`;
  
      // Ejecutar la consulta
      const resultado = await client.query(consulta);
  
      console.log('Productos:', resultado.rows); // Imprimir los resultados

      productos = resultado.rows
      res.status(200).json(productos)

    } catch (error) {
      console.error('Error al consultar productos:', error);
      res.status(500).json({ error: 'Error al consultar productos' });
    }
}

export const getProductoId = async (req, res) => {

  const client = await db.connect()
  let producto
  const id = req.params.id

  try {
  
      // Consulta SQL
      const consulta = `SELECT * FROM productos WHERE producto_id = ${id}`;
  
      // Ejecutar la consulta
      const resultado = await client.query(consulta);
  
      console.log('Producto:', resultado.rows); // Imprimir los resultados
      producto = resultado.rows
      res.status(200).json(producto)
    } catch (error) {
      console.error('Error al buscar producto:', error);
      res.status(500).json({ error: 'Error al buscar producto' });
    }

    
}