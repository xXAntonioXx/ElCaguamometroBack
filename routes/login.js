const express = require('express')
const router = express.Router();
const db = require('../database/db');
const jwt = require('jsonwebtoken');
const authenticateJWT = require('../auth/authMiddleware');

router.post('/login', async function (req, res){
    
    const User = {
        Name:req.body.Username,
        Password:req.body.Password
    };

    const dbCrud = new db.dbCrud();
    await dbCrud.createMongooseConnection();
    const UserModel = dbCrud.connection.model('User');
    
    const UserdFinded = await UserModel.findOne(User).exec();

    if(UserdFinded == null){
        res.send('Error');
    }else{
        const secret = process.env.SECRET;
        const accessToken = jwt.sign({ username:req.body.Username},secret);
        res.json({accessToken});
    }
});

router.get('/login/test', authenticateJWT.authenticateJWT, function (req,res){
    res.send('bienvenido');
});

module.exports = router