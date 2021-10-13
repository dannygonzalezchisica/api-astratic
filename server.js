import Express from "express";
import Cors from "cors";
import dotenv from "dotenv"
import { conectarBD } from "./db/db.js";
import rutasUsuario from "./views/usuarios/rutas.js";
import rutasProducto from "./views/productos/rutas.js";
import rutasVenta from "./views/ventas/rutas.js";

dotenv.config({path: './.env'})

const app = Express()

app.use(Express.json())
app.use(Cors())
app.use(rutasUsuario)
app.use(rutasProducto)
app.use(rutasVenta)

const main = () => {
    return app.listen(process.env.PORT, () => {
        console.log(`Escuchando puerto ${process.env.PORT}`);
    })
}

conectarBD(main)