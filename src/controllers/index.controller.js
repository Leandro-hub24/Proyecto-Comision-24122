import { db } from '@vercel/postgres'

export const getIndex = async (req, res) => {

    const client = await db.connect()
    let productos
    let pedidos
    console.log(req.user)  

    try {
    
        // Consulta SQL
        const consulta = 'SELECT * FROM productos WHERE stock > 0 ORDER BY nombre  LIMIT 4 OFFSET 0 ';
        // Ejecutar la consulta
        const resultado = await client.query(consulta);;
    
        

        /* console.log('Productos:', resultado.rows); // Imprimir los resultados */

        productos = resultado.rows

        

          if(req.login){
            const usuarioSesion = {
                nombres: req.user.nombres,
                apellidos: req.user.apellidos,
                img_url: req.user.img_url,
                rol: req.user.rol       
            }
    
            res.render('index', {
             login: true,
             id: req.user.idUser,
             usuarioSesion,
             productos
            })
        } else {
    
            res.render('index', {
                login: false,
                productos   
            })
        } 

      } catch (error) {
        console.error('Error al consultar productos:', error);
        res.status(500).json({ error: 'Error al consultar productos' });
      }

}