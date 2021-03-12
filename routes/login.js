const express = require('express')
const router = express.Router();
const db = require('../database/db');
const jwt = require('jsonwebtoken');
const authenticateJWT = require('../auth/authMiddleware');

router.post('/login', async function (req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
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
        const accessToken = jwt.sign({ username:req.body.Username},secret,{ expiresIn:"20m" });

        const refreshSecret = process.env.REFRESH_SECRET;
        const refreshToken = jwt.sign({ username:req.body.Username }, refreshSecret);

        await dbCrud.insert("refreshToken",{refreshToken:refreshToken});
        dbCrud.closeMongooseConnection();
        res.json({accessToken,refreshToken});
    }
    dbCrud.closeMongooseConnection();
});

router.post('/refreshToken',async function(req,res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { refreshToken } = req.body;
    const refreshSecret = process.env.REFRESH_SECRET;
    const secret = process.env.SECRET;
    jwt.verify(refreshToken,refreshSecret,async (err,user)=>{
        if(err){return res.sendStatus(403);}
        const dbCrud = new db.dbCrud();
        await dbCrud.createMongooseConnection();
        const refreshTokenModel = dbCrud.connection.model('refreshToken');
        const refreshTokenIsValid = await refreshTokenModel.findOne({refreshToken:refreshToken}).exec();
        if(refreshTokenIsValid){
            const accessToken = jwt.sign({ username:user.username},secret,{ expiresIn:"20m" });
            const refreshTokenRenovated = jwt.sign({ username:req.body.Username }, refreshSecret);
            await refreshTokenModel.deleteOne({refreshToken:refreshToken});
            await dbCrud.insert("refreshToken",{refreshToken:refreshTokenRenovated});
            dbCrud.closeMongooseConnection();
            res.json({accessToken,refreshTokenRenovated});
        }else{
            res.sendStatus(400)
        }
        dbCrud.closeMongooseConnection();
    });
});

router.get('/auth/validateToken', function(req,res){
    const tokenIsValid = authenticateJWT.verifyToken(req);
    res.json({isValid:tokenIsValid});
});

router.get('/login/test', authenticateJWT.authenticateJWT, function (req,res){
    res.send('bienvenido');
});

module.exports = router