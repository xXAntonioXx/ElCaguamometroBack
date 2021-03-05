const mongoose = require('mongoose');

class dbCrud {

    constructor(){
        this.connection = undefined;
    }

    async createMongooseConnection(){
        const dbHost = process.env.DB_HOST;
        const dbName = process.env.DB_NAME;
        const connectionString = `mongodb://${dbHost}/${dbName}`;
    
        const config = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }
    
        this.connection = await mongoose.connect(connectionString,config);
    }
    
    async loadModel(modelName, modelSchema){
        try{
            return this.connection.model(modelName, modelSchema);
        }catch(Ex){
            console.log("Error on compiling a model");
            return null;
        }
    }

    closeMongooseConnection(){
        this.connection.disconnect();
    }
}

module.exports = {
    dbCrud
}