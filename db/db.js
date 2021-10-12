import { MongoClient } from "mongodb"
import dotenv from "dotenv"

dotenv.config({path: './.env'})

const stringbaseDeDatos = process.env.DATABASE_URL

const client = new MongoClient(stringbaseDeDatos, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let baseDeDatos

const conectarBD = (callback) => {
    client.connect((err, db)=> {
        if(err) {
            console.error("Error conectando a la base de datos")
            return false;
        }
        baseDeDatos = db.db('astratic')
        console.log('¡Conexión exitosa!')
        return callback()
    })
}

const getDB = () => {
    return baseDeDatos
}

export { conectarBD, getDB }