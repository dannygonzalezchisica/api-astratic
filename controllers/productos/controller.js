import { ObjectId } from "mongodb";
import { getBD } from "../../db/db.js";

const queryAllProducts = async (callback) => {
    const baseDeDatos = getBD()
        await baseDeDatos.collection('productos').find({}).toArray(callback)
}

const crearProducto = async (datosProducto, callback) => {
    const baseDeDatos = getBD()
    await baseDeDatos.collection('productos').insertOne(datosProducto, callback)
}

const editarProducto = async (id, edicion, callback) => {
    const filtroProducto = {_id: new ObjectId(id)}
    const operacion = {
        $set: edicion,
    }
    const baseDeDatos = getBD()
    await baseDeDatos.collection('productos').findOneAndUpdate(filtroProducto, operacion, {upsert: true, returnOriginal: true}, callback)
}

const eliminarProducto = async (id, callback) => {
    const filtroProducto = {_id: new ObjectId(id)}
    const baseDeDatos = getBD()
    await baseDeDatos.collection('productos').deleteOne(filtroProducto, callback)
}

export { queryAllProducts, crearProducto, editarProducto, eliminarProducto }