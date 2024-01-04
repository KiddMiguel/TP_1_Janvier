const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.authenticator = (req, res, next) =>{
    // récupérer le token
    const token = req.params.token ? req.params.token : req.headers.authorization
    if(token && process.env.SECRET_KEY){
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
            // si problème => erreur
            if(err){
                res.status(401).json({erreur: "accès refusé"})
            }
            // décoder => next()
            else{
                next()
            }
        })
    }else{
        res.status(401).json({erreur: "accès refusé"})
    }
}