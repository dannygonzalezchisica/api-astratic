import Express from "express";
import Cors from "cors";
import dotenv from "dotenv"
import { conectarBD } from "./db/db.js";
import rutasUsuario from "./views/usuarios/rutas.js";
import rutasProducto from "./views/productos/rutas.js";
import rutasVenta from "./views/ventas/rutas.js";
import jwt from "express-jwt";
import jwks from "jwks-rsa";

dotenv.config({path: './.env'})

const app = Express()

app.use(Express.json())
app.use(Cors())

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://astra-tic-empresa.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'api-autenticacion-astra-tic',
  issuer: 'https://astra-tic-empresa.us.auth0.com/',
  algorithms: ['RS256']
});

app.use(jwtCheck);

app.use(rutasUsuario)
app.use(rutasProducto)
app.use(rutasVenta)

const main = () => {
    return app.listen(process.env.PORT, () => {
        console.log(`Escuchando puerto ${process.env.PORT}`);
    })
}

conectarBD(main)