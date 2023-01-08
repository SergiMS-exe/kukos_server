module.exports = function(app, gestorBD){

    app.get("/", function(req,res){
        res.send("Prueba ok")
    })

}