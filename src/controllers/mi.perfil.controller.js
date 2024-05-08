import { db } from '@vercel/postgres'
import axios from 'axios'

export const getMiPerfil = async (req, res) => {
    
    const client = await db.connect()
    let compras
    let pedidos

    try {
    
        // Consulta SQL
        const consulta = `SELECT email FROM usuarios_1 WHERE usuario_id = ${req.signedCookies['idUser']}`;
        const consulta1 = `SELECT * FROM compras WHERE usuario_id = ${req.signedCookies['idUser']}`;
        
        // Ejecutar la consulta
        const resultado = await client.query(consulta);
        const resultado1 = await client.query(consulta1);
        compras = resultado1.rows
        
        for(let i = 0; i < compras.length; i++) {
            const consulta2 = `SELECT * FROM pedidos WHERE compra_id = ${compras[i].compra_id}`;
            const resultado2 = await client.query(consulta2);
            compras[i].pedidos = resultado2.rows
        }   

        console.log('Usuario:', resultado.rows[0]); // Imprimir los resultados
        console.log('Compras:', compras)

         


        if(req.signedCookies['loggedin']){

            const usuarioSesion = {
                nombres: req.signedCookies['nombres'],
                apellidos: req.signedCookies['apellidos'],
                img_url: req.signedCookies['img_url'],
                rol: req.signedCookies['rol']
            }

            res.render('miPerfil', {
            login: true,
            id: req.signedCookies['idUser'],
            usuarioSesion,
            email: resultado.rows[0].email,
            compras
            })

        } else {

            res.redirect('/')
            
        } 
          

      } catch (error) {
        console.error('Error al consultar datos de usuario:', error);
        res.status(500).json({ error: 'Error al consultar datos de usuario' });
      }

    
    

}