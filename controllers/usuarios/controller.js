import { getDB } from "../../db/db.js"

const queryAllUsers = async (callback) => {
    const baseDeDatos = getDB()
    await baseDeDatos.collection('usuario').find({}).toArray(callback)
}

const crearUsuario = async (datosUsuario, callback) => {
    if (Object.keys(datosUsuario).includes('documentoIdentidad') &&
    Object.keys(datosUsuario).includes('nombre') &&
    Object.keys(datosUsuario).includes('apellidos') &&
    Object.keys(datosUsuario).includes('numeroCelular') &&
    Object.keys(datosUsuario).includes('correoElectronico') &&
    Object.keys(datosUsuario).includes('rol') &&
    Object.keys(datosUsuario).includes('estado')) {
        // Implementar código para crear usuario en la BD
        const baseDeDatos = getDB()
        baseDeDatos.collection('usuario').insertOne(datosUsuario, callback)
    } else {
        return "Error"
    }
}

export { queryAllUsers, crearUsuario }