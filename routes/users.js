module.exports = function(app, gestorBD){

    app.get("/", function(req,res){
        res.send("Prueba ok")
    })

    app.get("/getUserById", async function(req, res){
        var usuario = {
            _id : gestorBD.mongo.ObjectId(req.query._id)
        }

        const user = await gestorBD.obtenerItem("user", usuario)

        if (user == null)
            bdFallo(res)
        else {
            res.status(200)
            res.send(user)
        }
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
            if (user==undefined){ //Usuario no encontrado
                res.status(404)
                res.send({ message: "Usuario no encontado"})
            } else { //Usuario encontrado
                res.status(200)
                res.send(user)
            }
        }
    })

    app.post("/register", async function(req, res){
        var usuario = {
            nombre: req.body.nombre,
            email: req.body.email,
            nickName: req.body.nickName,
            lastLogin: Date.now(),
            password: req.body.password,
            moviesSaved : [],
            points: 200
        }

        const checkUserAlreadyRegistered = await gestorBD.obtenerItem("user", {email: req.body.email})

        if (checkUserAlreadyRegistered!=undefined){
            res.status(409)
            res.send({ error: "Usuario ya registrado"})
            return
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

    app.put("/updateLastRule", async function(req, res){
        var usuario = {
            _id: gestorBD.mongo.ObjectId(req.body._id)
        }
        const mods = { 
            $inc: { points: req.body.points },
            $set: { lastRule: Date.now() } 
        }
   

        const modifiedLastLogin = await gestorBD.modificarItemPersonalizado("user", usuario, mods)

        if (modifiedLastLogin===null){ //Fallo en la base de datos      
            bdFallo(res)
        } else {
            res.status(200)
            res.send(await gestorBD.obtenerItem("user", usuario))
        }
    })

    app.post("/saveMovie", async function(req, res){
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

    app.put("/decPoints", async function(req, res){
        var usuario = {
            _id : gestorBD.mongo.ObjectId(req.body._id)
        }

        var pointsToDec = req.body.points

        const updatePoints = await gestorBD.modificarItemPersonalizado("user", usuario, { $inc: { points: -pointsToDec } })

        if (updatePoints==null) {
            bdFallo(res)
        } else {
            res.status(200)
            res.send(await gestorBD.obtenerItem("user", usuario))
        }
    })
}

const bdFallo = (res)=>{
    console.log("Error al acceder a base de datos");
    res.send({ message: "error al acceder a base de datos"})
    res.status(500)
}