import { MongoClient } from "mongodb";
import dotenv from "dotenv"

dotenv.config({path: './.env'})

const stringConexion = process.env.DATABASE_URL

const client = new MongoClient(stringConexion, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

let baseDeDatos

const conectarBD = (callback) => {
    client.connect((err, db) => {
        if(err) {
            console.error('Error conectando a la BD')
        }
        baseDeDatos = db.db('empresaGenerica')
        console.log('¡Conexión exitosa!')
        return callback()
    })
}

const getBD = () => {
    return baseDeDatos
}

export { conectarBD, getBD }