import Express from "express";
import { crearUsuario, queryAllUsers } from "../../controllers/usuarios/controller.js";
import { getBD } from "../../db/db.js";

const rutasUsuario = Express.Router()

const genericCallback = (res) => (err, result) => {
    if(err) {
        res.status(500).send('Error consultando los usuarios')
    } else {
        res.json(result)
    }
 }

rutasUsuario.route('/usuarios').get((req, res) => {
    console.log('Alguien hizo GET en la ruta /usuarios')
    queryAllUsers(genericCallback(res))
})

rutasUsuario.route('/usuarios/nuevo').post((req, res) => {
   crearUsuario(req.body, genericCallback(res))
})

rutasUsuario.route('/usuarios/editar').patch((req, res) => {
    const edicion = req.body
    console.log(edicion)
    const filtroUsuario = {_id: new ObjectId(edicion.id)}
    delete edicion.id;
    const operacion = {
        $set: edicion,
    }
    const baseDeDatos = getBD()
    baseDeDatos.collection('usuarios').findOneAndUpdate(filtroUsuario, operacion, {upsert: true, returnOriginal: true}, (err, result) => {
        if(err) {
            console.error('Error actualizando el usuario: ', err)
            res.sendStatus(500)
        } else {
            console.log('Usuario actualizado con éxito')
            res.sendStatus(200)
        }
    })
})

rutasUsuario.route('/usuarios/eliminar').delete((req, res) => {
    const filtroUsuario = {_id: new ObjectId(req.body.id)}
    const baseDeDatos = getBD()
    baseDeDatos.collection('usuarios').deleteOne(filtroUsuario, (err, result) => {
        if(err) {
            console.error(err)
            res.sendStatus(500)
        } else {
            res.sendStatus(200)
        }
    })
})

export default rutasUsuario