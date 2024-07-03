import { db } from '@vercel/postgres'

export const getComprasID = async (req, res) => {

    const client = await db.connect(); 
    let compras;
    let id = req.params.id

    try {
        // Utilizar consulta preparada
        const consulta = 'SELECT * FROM compras WHERE usuario_id = $1';
        // Ejecutar la consulta
        compras = await client.query(consulta, id);

        if(compras.rows.length > 0) {
            for(let i = 0; i < compras.rows.length; i++) {

                const consulta = 'SELECT * FROM pedidos WHERE compra_id = $1';
                const productos = await client.query(consulta, compras.rows[i].compra_id);
                compras.rows[i].productos = productos.rows;
                res.status(200).json({compras: compras.rows})
            }
        }

    } catch (error) {
        console.error('Error al consultar las compras:', error);
        res.status(500).json({ error: 'Error al consultar las compras' });
    } finally {
        client.release();
    }

}

export const postCompras = async (req, res) => {

    const client = await db.connect(); 
    const compras = req.body;
    const fechaActual = new Date().toISOString().split('T')[0];

    try {
        await client.query('BEGIN'); // Iniciar transacción

        const query = {
          text: `INSERT INTO compras (usuario_id, fecha_compra, situacion) 
                VALUES ($1, $2, $3) RETURNING compra_id`,
          values: [
            req.user.idUser,
            fechaActual,
            'En proceso'
          ],
        };
        
        // Ejecutar la consulta
        const insertCompra = await client.query(query)
        console.log('Filas afectadas:', insertCompra.rowCount);
        
        for(let i = 0; i < compras.length; i++) {
            const query1 = {
            text: `INSERT INTO pedidos (producto_id, cant, compra_id) 
                    VALUES ($1, $2, $3)`,
            values: [
                compras[i].producto_id,
                compras[i].cantidad,
                insertCompra.rows[0].compra_id
            ],
            };
                
            // Ejecutar la consulta
            const insertProductos = await client.query(query1)
            console.log('Filas afectadas:', insertProductos.rowCount);  
        }

        await client.query('COMMIT'); // Confirmar transacción
     

        res.status(200).json({message: 'Compra realizada correctamente'})
      } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error al realizar la compra:', error);
        res.status(500).json({ error: 'Error al realizar la compra' });
      } finally {
        client.release();
      }

      

}