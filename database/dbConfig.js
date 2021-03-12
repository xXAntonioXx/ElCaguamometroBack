const db = require('./db');
const UserSchema = require('./models/Users');
const refreshTokenSchema = require('./models/refreshTokens');
const chalk = require('chalk');

const User = undefined;

async function loadAllModelsIntoDB(){
    const dbObject = new db.dbCrud();
    await dbObject.createMongooseConnection();
    await dbObject.loadModel("User",UserSchema.User);
    await dbObject.loadModel("refreshToken",refreshTokenSchema);
    dbObject.closeMongooseConnection();
}

async function createAdminUser(){
    const dbObject = new db.dbCrud();
    await dbObject.createMongooseConnection();
    this.User = dbObject.connection.model("User",UserSchema.User);
    const UserAdmin = new this.User({Name:'admin',Password:'pass'});
    UserAdmin.save((err,User)=>{
        if(err){console.log(err);}
        dbObject.closeMongooseConnection();
    });
}

module.exports = {
    loadAllModelsIntoDB : loadAllModelsIntoDB,
    createAdminUser : createAdminUser
}