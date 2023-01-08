module.exports = {
    client: null,
    mongo:null,
    init: function (client, mongo) {
        this.client = client
        this.mongo = mongo
    },
    obtenerItem: async function(collectionType, criterio){
        result = await this.obtenerItems(collectionType, criterio)
        if (result === null)
            return result
        return result[0]
    },
    obtenerItems: async function (collectionType, criterio) {
        await this.client.connect();
        console.log('Connected successfully to server');
        const db = this.client.db(this.dbName);
        const collection = db.collection(collectionType);

        var result;
        try {
            result = await collection.find(criterio).toArray()

        } catch (error) {
            console.error("Error al obtener: " + error);
            result = null;
        }
        return result;
    },
    insertarItem: async function (collectionType, item) {
        await this.client.connect();
        console.log('Connected successfully to server');
        const db = this.client.db(this.dbName);
        const collection = db.collection(collectionType);

        var result;
        try {
            result = await collection.insertOne(item)
        } catch (error) {
            console.error("Error al insertar: " + error)
            result = null
        }
        return result;
    },
    insertarItems: async function (collectionType, item) {
        await this.client.connect();
        console.log('Connected successfully to server');
        const db = this.client.db(this.dbName);
        const collection = db.collection(collectionType);

        var result;
        try {
            result = await collection.insertMany(item)
        } catch (error) {
            console.error("Error al insertar: " + error)
            result = null
        }
        return result;
    },
    modificarItem: async function (collectionType, criterio, change, remove) {
        await this.client.connect();
        console.log('Connected successfully to server');
        const db = this.client.db(this.dbName);
        const collection = db.collection(collectionType);

        var result;
        try {
            result = await collection.updateOne(criterio, {
                $set: change,
                $unset: remove
            });
        }
        catch (error) {
            console.error("Error al modificar: " + error)
            result = null
        }
        return result
    },
    modificarItemPersonalizado: async function (collectionType, criterio, howToUpdate) {
        await this.client.connect();
        console.log('Connected successfully to server');
        const db = this.client.db(this.dbName);
        const collection = db.collection(collectionType);

        var result;
        try {
            result = await collection.updateOne(criterio, howToUpdate);
        }
        catch (error) {
            console.error("Error al modificar: " + error)
            result = null
        }
        return result
    }
}