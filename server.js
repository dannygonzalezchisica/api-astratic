import Express from "express"

const app = Express()
app.use(Express.json())

app.get("/usuarios", (req, res)=> {
    console.log("Alguien hizo get en la ruta /usuarios")
    const usuarios = [
        {
            IDUsuario: "123ABC",
            documentoIdentidad: "1088000789",
            nombre: "Amapola",
            apellidos: "Polar",
            numeroCelular: 3218885555,
            correoElectronico: "amapolar@email.com",
            rol: "Vendedor",
            estado: "AUTORIZADO"
        },
        {
            IDUsuario: "456DEF",
            documentoIdentidad: "1077111654",
            nombre: "Patricia Ana",
            apellidos: "Tufillo",
            numeroCelular: 3117772222,
            correoElectronico: "patana@email.com",
            rol: "No Asignado",
            estado: "PENDIENTE"
        },
        {
            IDUsuario: "789GHI",
            documentoIdentidad: "1099555123",
            nombre: "Ébano",
            apellidos: "Banquete",
            numeroCelular: 3187774444,
            correoElectronico: "ebaquete@email.com",
            rol: "Administrador",
            estado: "AUTORIZADO"
        }
    ]
    res.send(usuarios)
})

app.post("/usuarios/nuevo", (req, res)=> {
    // Implementar código para crear usuario en la BD
    console.log("Usuario a crear: ", req.body)
    res.send("Usuario creado con éxito")
})

app.listen(5000, ()=> {
   console.log("Escuchando puerto 5000") 
})