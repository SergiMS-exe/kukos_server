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
            lastLogin: Date.now(),
            password: req.body.password,
            moviesSaved : []
        }

        const newUser = await gestorBD.insertarItem("user", usuario)

        if (newUser===null){ //Fallo en la base de datos      
            bdFallo(res)
        } else {
            res.status(200)
            usuario["_id"] = newUser.insertedId
            res.send(usuario)
        }

    })

    app.put("/updateLastLogin", async function(req, res){
        var usuario = {
            _id: gestorBD.mongo.ObjectId(req.body._id)
        }
        const lastLogin = {
            lastLogin: Date.now()
        }

        const modifiedLastLogin = await gestorBD.modificarItem("user", usuario, lastLogin)

        if (modifiedLastLogin===null){ //Fallo en la base de datos      
            bdFallo(res)
        } else {
            res.status(200)
            res.send(modifiedLastLogin)
        }
    })

    app.put("/saveMovie", async function(req, res){
        var usuario = {
            _id: gestorBD.mongo.ObjectId(req.body._id)
        }

        const movieToSave = req.body.idMovie

        var action; //accion a realizar (puede ser borrar o insertar pelicula)
        //comprobamos si la peli esta guardada por el usuario
        const user = await gestorBD.obtenerItem("user", usuario)

        if (user.moviesSaved.filter(x=>x==movieToSave).length>0){ //si el id de la pelicula ya esta en la lista, lo borramos
            action = {$pull: { moviesSaved : movieToSave }} //borramos
            user.moviesSaved.splice(user.moviesSaved.indexOf(movieToSave),1)
        }
        else {
            action = {$push: { moviesSaved : movieToSave }} //insertamos
            user.moviesSaved.push(movieToSave)
        }
        const movieSaved = await gestorBD.modificarItemPersonalizado("user", usuario, action)
        if (movieSaved===null){ //Fallo en la base de datos      
            bdFallo(res)
        } else {
            res.status(200)
            res.send(user)
        }
    })
}

const bdFallo = (res)=>{
    console.log("Error al acceder a base de datos");
    res.send({ message: "error al acceder a base de datos"})
    res.status(500)
}