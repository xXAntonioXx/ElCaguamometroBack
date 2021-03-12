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
            this.connection.model(modelName, modelSchema);
            //return this.connection.model(modelName, modelSchema);
        }catch(Ex){
            console.log("Error on compiling a model");
            //return null;
        }
    }

    insert(modelName,modelBody){
        return new Promise((resolve,reject)=>{
            const model = this.connection.model(modelName);
            const modelInstance = new model(modelBody);
            modelInstance.save((err,modelRetrived)=>{
                if(err){
                    console.log(`error at inserting a new "${modelName}"`);
                    reject(false);
                }
                resolve(true);
            });
        });
    }

    closeMongooseConnection(){
        this.connection.disconnect();
    }
}

module.exports = {
    dbCrud
}