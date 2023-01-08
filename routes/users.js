module.exports = function(app, gestorBD){

    app.get("/", function(req,res){
        res.send("Prueba ok")
    })

    app.post("/login", async function(req,res){
        let criterio = {
            email: req.body.email,
            password: req.body.password
        }

        let user = await gestorBD.obtenerItem("user", criterio)

        if (user===null){ //Fallo en la base de datos      
            bdFallo(res)
        } else {
            res.status(200)
            if (user==undefined){ //Usuario no encontrado
                res.send({ message: "Usuario no encontado"})
            } else { //Usuario encontrado
                res.send(user)
            }
        }
    })

    app.post("/register", async function(req, res){
        var usuario = {
            nombre: req.body.nombre,
            email: req.body.email,
            password: req.body.password
        }

        const newUser = await gestorBD.insertarItem("user", usuario)

        if (newUser==null){ //Fallo en la base de datos      
            bdFallo(res)
        } else {
            res.status(200)
            usuario["_id"] = newUser.insertedId
            res.send(usuario)
        }

    })
}

const bdFallo = (res)=>{
    console.log("Error al acceder a base de datos");
    res.send({ message: "error al acceder a base de datos"})
    res.status(500)
}