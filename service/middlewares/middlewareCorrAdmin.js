const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../database/database');

exports.authenticator = (req, res, next) => {
    // récupérer le token de l'en-tête 'Authorization' ou du corps de la requête
    const token = req.headers.authorization || req.body.token;

    if (token && process.env.SECRET_KEY) {
        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ erreur: "Token invalide, accès refusé" });
            } else {
                try {
                    console.log(decoded);
                    const result = await db.query('SELECT role FROM utilisateur where email= ?',[decoded.email])   
                    if (result.length > 0) {
                        const userRole = result[0].role;

                        if (['PUT', 'POST', 'DELETE'].includes(req.method) && userRole !== 'admin') {
                          return  res.status(403).json({ erreur: "Action autorisée uniquement pour les administrateurs" });
                        }

                        if (req.path.includes('/commentaire/add') && !['journaliste', 'admin'].includes(userRole)) {
                            return   res.status(403).json({ erreur: "Action autorisée uniquement pour les journalistes et admin" });
                        }

                        if (req.path.includes('/commentaire/get') && !userRole) {
                            return res.status(403).json({ erreur: "Seul les utilisateurs connectés peuvent voir les commentaires" });
                        }
                        next();
                    } else {
                        res.status(404).json({ erreur: "Utilisateur non trouvé" });
                    }
                } catch (dbError) {
                    res.status(500).json({ erreur: "Erreur lors de la vérification du rôle de l'utilisateur", dbError });
                }
            }
        });
    } else {
        res.status(401).json({ erreur: "Token non fourni, accès refusé" });
    }
};
