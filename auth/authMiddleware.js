const jwt = require("jsonwebtoken");

function authenticateJWT(req,res,next){
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        const secret = process.env.SECRET;
        jwt.verify(token,secret,(err,user)=>{
            if(err){
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    }else{
        res.sendStatus(401);
    }
}

function verifyToken(req){
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        const secret = process.env.SECRET;
        const payloadJwt = jwt.verify(token,secret);
        if(payloadJwt){
            return true;
        }
    }
    return false
}

module.exports = {
    authenticateJWT : authenticateJWT,
    verifyToken : verifyToken
}