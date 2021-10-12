import Express from "express";
import Cors from "cors";
import dotenv from "dotenv"
import { MongoClient, ObjectId } from "mongodb";

dotenv.config({path: './.env'})

const stringConexion = process.env.DATABASE_URL

const client = new MongoClient(stringConexion, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

let baseDeDatos

const app = Express()

app.use(Express.json())
app.use(Cors())

app.get('/usuarios', (req, res) => {
    console.log('Alguien hizo GET en la ruta /usuarios')
    baseDeDatos.collection('usuarios').find({}).toArray((err, result) => {
        if(err) {
            res.status(500).send('Error consultando los usuarios')
        } else {
            res.json(result)
        }
    })
})

app.post('/usuarios/nuevo', (req, res) => {
    const datosUsuario = req.body
    console.log('Llaves: ', Object.keys(datosUsuario))
    try {
        if(
            Object.keys(datosUsuario).includes('documentoIdentidad') &&
            Object.keys(datosUsuario).includes('nombre') &&
            Object.keys(datosUsuario).includes('apellidos') &&
            Object.keys(datosUsuario).includes('numeroCelular') &&
            Object.keys(datosUsuario).includes('correoElectronico') &&
            Object.keys(datosUsuario).includes('rol') &&
            Object.keys(datosUsuario).includes('estado')
        ) {
            // Implementar código para crear usuario en la BD
            baseDeDatos.collection('usuarios').insertOne(datosUsuario, (err, result) => {
                if(err) {
                    console.error(err)
                    res.sendStatus(500)
                } else {
                    console.log(result)
                    res.sendStatus(200)
                }
            })
        } else {
            res.sendStatus(500)
        }   
    } catch {
        res.sendStatus(500)
    }
})

app.patch('/usuarios/editar', (req, res) => {
    const edicion = req.body
    console.log(edicion)
    const filtroUsuario = {_id: new ObjectId(edicion.id)}
    delete edicion.id;
    const operacion = {
        $set: edicion,
    }
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

app.delete('/usuarios/eliminar', (req, res) => {
    const filtroUsuario = {_id: new ObjectId(req.body.id)}
    baseDeDatos.collection('usuarios').deleteOne(filtroUsuario, (err, result) => {
        if(err) {
            console.error(err)
            res.sendStatus(500)
        } else {
            res.sendStatus(200)
        }
    })
})

const main = () => {

    client.connect((err, db) => {
        if(err) {
            console.error('Error conectando a la BD')
        }
        baseDeDatos = db.db('empresaGenerica')
        console.log('¡Conexión exitosa!')
        return app.listen(process.env.PORT, () => {
            console.log(`Escuchando puerto ${process.env.PORT}`);
        })
    })
}

main()