const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function( req,res,next) {
    //Get token from header
    const token = req.header('x-auth-token');

    // check if not token
    if(!token) {
        return res.status(401).json({msg:'no token , auth is denied!!!!!' });
    }

     // verify token
     try{
         const decoded = jwt.verify(token, config.get('jwtsecret'));

         req.patient = decoded.patient;
         next();

     }catch(err){
      res.status(401).json({msg: 'Token is not valid'});
     }
}