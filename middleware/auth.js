const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){

    // read token header 
    const token = req.header('x-auth-token');
    // check token 
    if(!token) {
        return res.status(401).json({msg: 'Permission denied'});
    }

    // validate token
    try {

        const verifyToken = jwt.verify(token, process.env.SECRET);
        req.user = verifyToken.user;
        next();
        
    } catch (error) {
        return res.status(401).json({msg: 'Permission denied'});
    }

}