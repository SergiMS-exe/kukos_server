const express = require('express');
const mongodb = require('mongodb').MongoClient;

// Inicializar express
const app = express();

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`)); 

// Conectar a la base de datos de MongoDB
//Base de datos mongo
const mongo = require('mongodb')
let client = new mongo.MongoClient("mongodb+srv://admin:admin@cluster0.xk8rxrb.mongodb.net/?retryWrites=true&w=majority")
let gestorBD = require("./services/gestorBD");
gestorBD.init(client, mongo);

require("./routes/users")(app, gestorBD)