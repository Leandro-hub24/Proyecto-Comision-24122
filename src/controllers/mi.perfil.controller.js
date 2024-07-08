import { db } from '@vercel/postgres'
import axios from 'axios'
import { SECRET_KEY, TOKEN_EXPIRES_IN} from '../config.js'
import jwt from 'jsonwebtoken'

export const getMiPerfil = async (req, res) => {
    
    const client = await db.connect()
    let compras
    let pedidos

    try {
    
        // Consulta SQL
        const consultaUsuario = `SELECT email FROM usuarios_1 WHERE usuario_id = $1`;
        const consultaCompra = `SELECT * FROM compras WHERE usuario_id = $1`;
        
        // Ejecutar la consulta
        const resultado = await client.query(consultaUsuario, [req.user.idUser]);
        const resultado1 = await client.query(consultaCompra, [req.user.idUser]);
        compras = resultado1.rows
        
        for(let i = 0; i < compras.length; i++) {
            const consulta2 = `SELECT * FROM pedidos WHERE compra_id = ${compras[i].compra_id}`;
            const resultado2 = await client.query(consulta2);
            /* console.log(resultado2.rows) */
            compras[i].pedidos = resultado2.rows


            for(let j = 0; j < compras[i].pedidos.length; j++){
              const query = 'SELECT nombre, precio FROM productos WHERE producto_id = $1';
              // Ejecutar la consulta
              const pro = await client.query(query, [compras[i].pedidos[j].producto_id]);

              compras[i].pedidos[j].producto = pro.rows[0]
            }

        }   

        console.log('Usuario:', resultado.rows[0]); // Imprimir los resultados
        console.log('Compras:', compras)


            const usuarioSesion = {
              nombres: req.user.nombres,
              apellidos: req.user.apellidos,
              img_url: req.user.img_url,
              rol: req.user.rol   
            }

            res.render('miPerfil', {
            login: true,
            id: req.user.idUser,
            usuarioSesion,
            email: resultado.rows[0].email,
            compras
            })
          

    } catch (error) {
        console.error('Error al consultar datos de usuario:', error);
        res.status(500).json({ error: 'Error al consultar datos de usuario' });
    } finally {
        client.release();
    }

    
    

}

export const putMiPerfil = async (req, res) => {
  const user = req.body;
  const uploadUrl = 'https://api.imgur.com/3/image';
  const clientId = 'a584d6c634ac09c';
  const client = await db.connect()
  /* console.log(user) */
  let img_url
      if(user.image64){

        const imageFile = user.image64
        
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
        /* console.log(img_url) */
        
        try {
          const query1 = {
            text: `UPDATE usuarios_1 SET nombre = $1, apellido = $2, email = $3, img_url = $4 WHERE usuario_id = $5`,
            values: [
              user.nombre,
              user.apellido,
              user.email,
              img_url,
              req.user.idUser
            ],
          };
          
          // Ejecutar la consulta
          const editUser = await client.query(query1)
          
          if (editUser.rowCount > 0) {
            console.log('Filas afectadas:', editUser.rowCount);
            res.cookie('nombres', user.nombre, { maxAge: 900000, httpOnly: true, secure: true, signed: true })
            res.cookie('apellidos', user.apellido, { maxAge: 900000, httpOnly: true, secure: true, signed: true })
            res.cookie('img_url', img_url, { maxAge: 900000, httpOnly: true, secure: true, signed: true})

            try {

                const token = jwt.sign({loggedin: true, idUser: req.user.idUser, nombres: user.nombre, apellidos: user.apellido, img_url: img_url, rol: req.user.rol}, SECRET_KEY, {expiresIn: TOKEN_EXPIRES_IN})
                res.cookie('idUser', req.user.idUser, { maxAge: (((60*1000)*60)*2), httpOnly: true, secure: true, signed: true })

                const query1 = {
                text: `UPDATE sesions SET sesion = $1 WHERE usuario_id = $2`,
                values: [
                    token,
                    req.user.idUser
                ],
                };
                
                // Ejecutar la consulta
                const insertUser = await client.query(query1)
                console.log('Filas afectadas:', insertUser.rowCount);  
            } catch (error) {
                console.error('Error al actualizar sesión:', error);
                res.status(500).json({ error: 'Error al actualizar la sesión' });
            }

            res.status(200).json(editUser.rowCount);
          } else {
            console.log('No se encontró ningún usuario con el ID proporcionado.');
            res.status(404).json({ error: 'Usuario no encontrado' });
          }

        } catch (error) {
          console.error('Error al actualizar datos del usuario:', error);
          res.status(500).json({ error: 'Error al actualizar datos del usuario' });
        } finally {
          client.release();
        }

      }else{

        try {
          const query1 = {
            text: `UPDATE usuarios_1 SET nombre = $1, apellido = $2, email = $3 WHERE usuario_id = $4`,
            values: [
              user.nombre,
              user.apellido,
              user.email,
              req.user.idUser
            ],
          };
          
          // Ejecutar la consulta
          const editUser = await client.query(query1)
          
          if (editUser.rowCount > 0) {
            console.log('Filas afectadas:', editUser.rowCount);
            res.cookie('nombres', user.nombre, { maxAge: 900000, httpOnly: true, secure: true, signed: true })
            res.cookie('apellidos', user.apellido, { maxAge: 900000, httpOnly: true, secure: true, signed: true })

            try {

              const token = jwt.sign({loggedin: true, idUser: req.user.idUser, nombres: user.nombre, apellidos: user.apellido, img_url: req.user.img_url, rol: req.user.rol}, SECRET_KEY, {expiresIn: TOKEN_EXPIRES_IN})
              res.cookie('idUser', req.user.idUser, { maxAge: (((60*1000)*60)*2), httpOnly: true, secure: true, signed: true })

              const query1 = {
              text: `UPDATE sesions SET sesion = $1 WHERE usuario_id = $2`,
              values: [
                  token,
                  req.user.idUser
              ],
              };
              
              // Ejecutar la consulta
              const insertUser = await client.query(query1)
              console.log('Filas afectadas:', insertUser.rowCount);  
          } catch (error) {
              console.error('Error al actualizar sesión:', error);
              res.status(500).json({ error: 'Error al actualizar la sesión' });
          }

            res.status(200).json(editUser.rowCount);
          } else {
            console.log('No se encontró ningún usuario con el ID proporcionado.');
            res.status(404).json({ error: 'Usuario no encontrado' });
          }

        } catch (error) {
          console.error('Error al actualizar datos del usuario:', error);
          res.status(500).json({ error: 'Error al actualizar datos del usuario' });
        } finally {
          client.release();
        }

      }
}