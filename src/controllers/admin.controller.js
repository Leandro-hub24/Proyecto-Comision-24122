import { db } from '@vercel/postgres'
import axios from 'axios'

export const getAdmin = async (req, res) => {
    const client = await db.connect()
    let productos
    let pedidos  

    try {
    
        // Consulta SQL
        const consulta = 'SELECT * FROM productos ORDER BY nombre LIMIT 8 OFFSET 0';
        const consultaStock = 'SELECT COUNT(producto_id) FROM productos WHERE stock > 0'
        const consultaSinStock = 'SELECT COUNT(producto_id) FROM productos WHERE stock = 0'
        // Ejecutar la consulta
        const resultado = await client.query(consulta);
        const resultado1 = await client.query(consultaStock);
        const resultado2 = await client.query(consultaSinStock);
    
        

        console.log('Productos:', resultado.rows); // Imprimir los resultados
        console.log('Productos con stock:', resultado1.rows)
        console.log('Productos sin stock:', resultado2.rows)

        productos = resultado.rows

        
          const usuarioSesion = {
            nombres: req.signedCookies['nombres'],
            apellidos: req.signedCookies['apellidos'],
            img_url: req.signedCookies['img_url'],
            rol: req.signedCookies['rol']
          }
  
          res.render('admin', {
           login: true,
           id: req.signedCookies['idUser'],
           usuarioSesion,
           productos,
           stock: resultado1.rows[0].count,
           sinStock: resultado2.rows[0].count
          })

      } catch (error) {
        console.error('Error al consultar productos:', error);
        res.status(500).json({ error: 'Error al consultar productos' });
      }
   
    /* console.log(rows) */

    /* if(req.signedCookies['loggedin']){
        const usuarioSesion = {
            nombres: req.signedCookies['nombres'],
            apellidos: req.signedCookies['apellidos'],
        }

        res.render('index', {
         login: true,
         id: req.signedCookies['idUser'],
         usuarioSesion,
         index: true
        })
    } else {
        res.render('index', {
            login: false,
            alojamientos,
            index: true
        })
    }  */

    

}

export const postAdmin = async (req, res) => {
    const client = await db.connect()
    let productos
    const {i} = req.body

    try {
    
        // Consulta SQL
        const consulta = `SELECT * FROM productos ORDER BY nombre LIMIT 8 OFFSET ${i}`;
        const consultaStock = 'SELECT COUNT(producto_id) FROM productos WHERE stock > 0'
        const consultaSinStock = 'SELECT COUNT(producto_id) FROM productos WHERE stock = 0'
    
        // Ejecutar la consulta
        const resultado = await client.query(consulta);
        const resultado1 = await client.query(consultaStock);
        const resultado2 = await client.query(consultaSinStock);
    
        console.log('Productos:', resultado.rows); // Imprimir los resultados
        console.log('Productos con stock:', resultado1.rows)
        console.log('Productos sin stock:', resultado2.rows)

        productos = resultado.rows
        res.status(200).json({
          productos, 
          stock: resultado1.rows[0].count,
          sinStock: resultado2.rows[0].count
        })

      } catch (error) {
        console.error('Error al consultar productos:', error);
        res.status(500).json({ error: 'Error al consultar productos' });
      }
}

export const getProductos = async (req, res) => {
    const client = await db.connect()
    let productos
    const i = req.params.i

    try {
    
        // Consulta SQL
        const consulta = `SELECT * FROM productos ORDER BY nombre LIMIT ${i} OFFSET 0`;
        const consultaStock = 'SELECT COUNT(producto_id) FROM productos WHERE stock > 0'
        const consultaSinStock = 'SELECT COUNT(producto_id) FROM productos WHERE stock = 0'
    
        // Ejecutar la consulta
        const resultado = await client.query(consulta);
        const resultado1 = await client.query(consultaStock);
        const resultado2 = await client.query(consultaSinStock);
    
        console.log('Productos:', resultado.rows); // Imprimir los resultados
        console.log('Productos con stock:', resultado1.rows)
        console.log('Productos sin stock:', resultado2.rows)

        productos = resultado.rows
        res.send({productos, stock: resultado1.rows[0].count, sinStock: resultado2.rows[0].count})

      } catch (error) {
        console.error('Error al consultar productos:', error);
        res.status(500).json({ error: 'Error al consultar productos' });
      }
}

export const getProductosStock = async (req, res) => {

  const client = await db.connect()
    let productos
    const i = req.params.i

   
    
        // Consulta SQL
        if(i === '1'){
          try {
            const consulta = 'SELECT * FROM productos WHERE stock > 0'
            const consultaSinStock = 'SELECT COUNT(producto_id) FROM productos WHERE stock = 0'
    
            // Ejecutar la consulta
            const resultado = await client.query(consulta);
        
            console.log('Productos:', resultado.rows); // Imprimir los resultados

            productos = resultado.rows
            res.send(productos)

          } catch (error) {
            console.error('Error al consultar productos:', error);
            res.status(500).json({ error: 'Error al consultar productos' });
          }

        }else{

          try {
            const consulta = 'SELECT * FROM productos WHERE stock = 0'
  
            // Ejecutar la consulta
            const resultado = await client.query(consulta);
        
            console.log('Productos:', resultado.rows); // Imprimir los resultados

            productos = resultado.rows
            res.send(productos)

          } catch (error) {
            console.error('Error al consultar productos:', error);
            res.status(500).json({ error: 'Error al consultar productos' });
          }

        }
        

}

export const postProducto = async (req, res) => {

  const producto = req.body;
  const uploadUrl = 'https://api.imgur.com/3/image';
  const clientId = 'a584d6c634ac09c';
  const client = await db.connect()
  console.log(producto)

        const imageFile = producto.image64
        let img_url
        try {
          // Configurar la solicitud POST con la imagen y las credenciales
          const response = await axios.post(uploadUrl, {
            image: imageFile.split(',')[1],
            type: 'base64'
          }, {
            headers: {
              'Authorization': `Client-ID ${clientId}`
            }
          });
          
          // Imprimir la URL de la imagen subida
          console.log('Image uploaded successfully:', response.data.data.link);
          img_url = response.data.data.link 
          // Devolver la URL de la imagen subida
          
        } catch (error) {
          // Manejar cualquier error que ocurra durante la carga de la imagen
          console.error('Error uploading image perfil:', error.message);
          res.status(500).json({ error: 'Error al subir la imagen' });
          
        }

        try {
          const query1 = {
            text: `INSERT INTO productos (nombre, descripcion, precio, stock, img_url) 
                  VALUES ($1, $2, $3, $4, $5)`,
            values: [
              producto.nombre,
              producto.descripcion,
              producto.precio,
              producto.stock,
              img_url
            ],
          };
          
          // Ejecutar la consulta
          const insertProducto = await client.query(query1)
          console.log('Filas afectadas:', insertProducto.rowCount);  
          res.status(200).json(insertProducto.rowCount)
        } catch (error) {
          console.error('Error al insertar datos producto:', error);
          res.status(500).json({ error: 'Error al insertar datos producto' });
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

export const putProducto = async (req, res) => {

  const producto = req.body;
  const uploadUrl = 'https://api.imgur.com/3/image';
  const clientId = 'a584d6c634ac09c';
  const client = await db.connect()
  console.log(producto)

      if(producto.image64 !== ''){

        const imageFile = producto.image64
        let img_url
        try {
          // Configurar la solicitud POST con la imagen y las credenciales
          const response = await axios.post(uploadUrl, {
            image: imageFile.split(',')[1],
            type: 'base64'
          }, {
            headers: {
              'Authorization': `Client-ID ${clientId}`
            }
          });
          
          // Imprimir la URL de la imagen subida
          console.log('Image uploaded successfully:', response.data.data.link);
          img_url = response.data.data.link 
          // Devolver la URL de la imagen subida
          
        } catch (error) {
          // Manejar cualquier error que ocurra durante la carga de la imagen
          console.error('Error uploading image perfil:', error.message);
          res.status(500).json({ error: 'Error al subir la imagen' });
          
        }

        try {
          const query1 = {
            text: `UPDATE productos SET nombre = $1, descripcion = $2, precio = $3, stock = $4, img_url = $5 WHERE producto_id = $6`,
            values: [
              producto.nombre,
              producto.descripcion,
              producto.precio,
              producto.stock,
              img_url,
              producto.producto_id
            ],
          };
          
          // Ejecutar la consulta
          const editProducto = await client.query(query1)
          
          if (editProducto.rowCount > 0) {
            console.log('Filas afectadas:', editProducto.rowCount);
            res.status(200).json(editProducto.rowCount);
          } else {
            console.log('No se encontró ningún producto con el ID proporcionado.');
            res.status(404).json({ error: 'Producto no encontrado' });
          }

        } catch (error) {
          console.error('Error al actualizar datos del producto:', error);
          res.status(500).json({ error: 'Error al actualizar datos del producto' });
        }

      }else{

        try {
          const query1 = {
            text: `UPDATE productos SET nombre = $1, descripcion = $2, precio = $3, stock = $4 WHERE producto_id = $5`,
            values: [
              producto.nombre,
              producto.descripcion,
              producto.precio,
              producto.stock,
              producto.producto_id
            ],
          };
          
          // Ejecutar la consulta
          const editProducto = await client.query(query1)
          
          if (editProducto.rowCount > 0) {
            console.log('Filas afectadas:', editProducto.rowCount);
            res.status(200).json(editProducto.rowCount);
          } else {
            console.log('No se encontró ningún producto con el ID proporcionado.');
            res.status(404).json({ error: 'Producto no encontrado' });
          }

        } catch (error) {
          console.error('Error al actualizar datos del producto:', error);
          res.status(500).json({ error: 'Error al actualizar datos del producto' });
        }

      }
        

        

}

export const deleteProducto = async (req, res) => {

  const client = await db.connect()

    const {id} = req.body 
        
          try {

            // Consulta SQL
            const consulta = `DELETE FROM productos WHERE producto_id = ${id}`
    
            // Ejecutar la consulta
            const resultado = await client.query(consulta);
        
            console.log('Producto eliminado con id: ', id); // Imprimir los resultados

            res.status(200).json(resultado.rowCount)

          } catch (error) {
            console.error('Error al eliminar producto:', error);
            res.status(500).json({ error: 'Error al eliminar producto' });
          }

}