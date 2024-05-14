import { db } from '@vercel/postgres'

export const getIndex = async (req, res) => {

    const client = await db.connect()
    let productos
    let pedidos  

    try {
    
        // Consulta SQL
        const consulta = 'SELECT * FROM productos WHERE stock > 0 ORDER BY nombre  LIMIT 4 OFFSET 0 ';
        // Ejecutar la consulta
        const resultado = await client.query(consulta);;
    
        

        console.log('Productos:', resultado.rows); // Imprimir los resultados

        productos = resultado.rows

        
          const usuarioSesion = {
            nombres: req.signedCookies['nombres'],
            apellidos: req.signedCookies['apellidos'],
            img_url: req.signedCookies['img_url'],
            rol: req.signedCookies['rol']
          }

          if(req.signedCookies['loggedin']){
            const usuarioSesion = {
                nombres: req.signedCookies['nombres'],
                apellidos: req.signedCookies['apellidos'],
                img_url: req.signedCookies['img_url'],
                rol: req.signedCookies['rol']       
            }
    
            res.render('index', {
             login: true,
             id: req.signedCookies['idUser'],
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