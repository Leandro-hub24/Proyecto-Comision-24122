import { db } from '@vercel/postgres'
import bcryptjs from 'bcryptjs'
import axios from 'axios'

export const getRegister = async (req, res) => {

        res.render('register', {
         login: false
        })

}

export const postRegister = async (req, res) => {
  const user = req.body;
  const uploadUrl = 'https://api.imgur.com/3/image';
  const clientId = 'a584d6c634ac09c';
  const client = await db.connect()
  console.log(user)

        const imageFile = user.image64
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

        let passwordHaash = await bcryptjs.hash(user.pass, 8)

        try {
          const query1 = {
            text: `INSERT INTO usuarios_1 (nombre, apellido, email, pass, img_url, rol) 
                  VALUES ($1, $2, $3, $4, $5, $6)`,
            values: [
              user.nombre,
              user.apellido,
              user.email,
              passwordHaash,
              img_url,
              'user'
            ],
          };
          
          // Ejecutar la consulta
          const insertUser = await client.query(query1)
          console.log('Filas afectadas:', insertUser.rowCount);  
          res.status(200).json(insertUser.rowCount)
        } catch (error) {
          console.error('Error al crear usuario:', error);
          res.status(500).json({ error: 'Error al crear usuario' });
        } finally {
          client.release();
        }
}