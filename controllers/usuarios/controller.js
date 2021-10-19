import { ObjectId } from "mongodb";
import { getBD } from "../../db/db.js";
import jwt_decode from "jwt-decode";

const queryAllUsers = async (callback) => {
    const baseDeDatos = getBD()
    await baseDeDatos.collection('usuarios').find({}).toArray(callback)
}

const crearUsuario = async (datosUsuario, callback) => {
        /*if(
            Object.keys(datosUsuario).includes('documentoIdentidad') &&
            Object.keys(datosUsuario).includes('nombre') &&
            Object.keys(datosUsuario).includes('apellidos') &&
            Object.keys(datosUsuario).includes('numeroCelular') &&
            Object.keys(datosUsuario).includes('correoElectronico') &&
            Object.keys(datosUsuario).includes('rol') &&
            Object.keys(datosUsuario).includes('estado')
        ) {
            // Implementar código para crear usuario en la BD*/
            const baseDeDatos = getBD()
            await baseDeDatos.collection('usuarios').insertOne(datosUsuario, callback)
        /*} else {
            return 'Error'
        }*/
}

const consultarUsuario = async (id, callback) => {
    const baseDeDatos = getDB();
    await baseDeDatos.collection('usuarios').findOne({ _id: new ObjectId(id) }, callback);
};

const consultarOCrearUsuario = async (req, callback) => {
    // 6.1. Obtener los datos del usuario desde el token
    const token = req.headers.authorization.split('Bearer ')[1]
    const user = jwt_decode(token)['http://localhost/userData']
    console.log(user)
    // 6.2. Con el correo del usuario o el ID de auth0, verificar si el usuario está en la BD
    const baseDeDatos = getBD();
    await baseDeDatos.collection('usuarios').findOne({ email: user.email }, async (err, response) => {
        console.log('response consulta BD', response)
        if(response) {
            // 7.1. Si el usuario ya está en la BD, devuelve la info del usuario
            callback(err, response)
        } else {
            // 7.2. Si el usuario no está en la BD, lo crea y devuelve la información
            user.auth0ID = user._id
            delete user._id
            user.rol = 'No Asignado'
            user.estado = 'PENDIENTE'
            await crearUsuario(user, (err, respuesta) => callback(err, user))
        }
    });
}

const editarUsuario = async (id, edicion, callback) => {
    const filtroUsuario = {_id: new ObjectId(id)}
    const operacion = {
        $set: edicion,
    }
    const baseDeDatos = getBD()
    await baseDeDatos.collection('usuarios').findOneAndUpdate(filtroUsuario, operacion, {upsert: true, returnOriginal: true}, callback)
}

const eliminarUsuario = async (id, callback) => {
    const filtroUsuario = {_id: new ObjectId(id)}
    const baseDeDatos = getBD()
    await baseDeDatos.collection('usuarios').deleteOne(filtroUsuario, callback)
}

export { queryAllUsers, crearUsuario, editarUsuario, eliminarUsuario, consultarUsuario, consultarOCrearUsuario }