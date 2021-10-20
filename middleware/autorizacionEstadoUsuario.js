import { getBD } from "../db/db.js";
import jwt_decode from "jwt-decode";

const autorizacionEstadoUsuario = async (req, res, next) => {
    // 1. Obtener el usuario desde el token
    const token = req.headers.authorization.split('Bearer ')[1]
    const user = jwt_decode(token)['http://localhost/userData']
    console.log(user)
    
    // 2. Consultar el usuario en la BD
    const baseDeDatos = getBD();
    await baseDeDatos.collection('usuarios').findOne({ email: user.email }, async (err, response) => {
        if(response) {
            console.log(response)
            // 3. Verificar el estado el usuario
            if(response.estado === "NO AUTORIZADO") {
                // 4. Si el usuario es NO AUTORIZADO, devolver un error de autenticación
                res.sendStatus(401)
            } else {
                console.log('Autorizado')
            }
        }
    })
    // 5. Si el usuario está PENDIENTE o AUTORIZADO, ejecutar next()
    next()
}

export default autorizacionEstadoUsuario