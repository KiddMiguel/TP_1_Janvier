const db = require('../database/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getAllUtilisateurs = async (req, res) => {
    try {
        const resultat = await db.query("SELECT * FROM utilisateur");
        res.status(200).json(resultat);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs", error });
    }
};

exports.register = async (req, res, next) => {
    try {
        const { nom, prenom, email, mdp } = req.body;
        if (!nom || !prenom || !email || !mdp) {
            return res.status(400).json({ error: "Données manquantes" });
        }
    // vérifier l'email de l'utilisateur
        const result = await db.query('SELECT * FROM utilisateur WHERE email = ?', [email]);
        if (result.length > 0) {
            return res.status(409).json({ error: "Utilisateur déjà existant" });
        }
    // utilisez bcrypt pour hasher le mdp
    const hashMDP = await bcrypt.hash(mdp, 10);

    // envoyer les infos (email, mdp hasher) en bdd
    await db.query("INSERT INTO utilisateur (nom, prenom, email, mdp) VALUES (?, ?, ?, ?)", [nom, prenom, email, hashMDP]);

    // renvoie jwt token pour la signature
    const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });
    next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur serveur" });
    }
};


exports.login = async(req, res)=> {
    try{
    // vérifier l'email de l'utilisateur => récupérer le mdp
    const { email, mdp } = req.body 
    const result = await db.query('select * from utilisateur where email = ?', [email])
    if(result.length == 0){
        return res.status(401).json({error: "utilisateur non existant"})
    }
    const utilisateur = result[0];
    // comparaison du mdp avec le mdp hasher en bdd avec bcrypt
    const SamePwd = await bcrypt.compare(mdp, utilisateur.mdp)
    if(!SamePwd){
        return res.status(401).json({error: "mdp incorrect"})
    }
    // renvoie jwt token pour la signature
    const token = jwt.sign({email}, process.env.SECRET_KEY, { expiresIn : '1h'});

// Verfifier si l'utilisateur est admin
if(utilisateur.role == "admin"){
    const result = await db.query('select * from utilisateur');
    const technologies = await db.query('select * from technologie');
    //res.json({token : token, result : result, technologies : technologies})
    res.render('utilisateurs', { utilisateurs : result, technologies : technologies, token : token });
}else{
    res.json({token : token, result : result})
    res.render('Oneutilisateur', { utilisateur  : utilisateur, token : token });
}

} catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
}
}
// exports.addUtilisateur = async (req, res) => {
//     try {
//         const { nom, prenom, email, mdp } = req.body;
//         await db.query("INSERT INTO utilisateur (nom, prenom, email, mdp) VALUES (?, ?, ?, ?)", [nom, prenom, email, mdp]);
//         res.status(201).json({ message: 'Utilisateur ajouté avec succès' });
//     } catch (error) {
//         res.status(500).json({ message: "Erreur lors de l'ajout de l'utilisateur", error });
//     }
// }


exports.EditUtilisateur = async (req, res) => {
    try {
        const { id, nom, prenom, email } = req.body;
        await db.query("UPDATE utilisateur SET nom = ?, prenom = ?, email = ? WHERE id = ?", [nom, prenom, email, id]);
        res.status(200).json({ message: 'Utilisateur mis à jour avec succès' });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur", error });
    }
}

exports.DeleteUtilisateur = async (req, res) => {
    try {
        const { id } = req.body;
        await db.query("DELETE FROM utilisateur WHERE id = ?", [id]);
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur", error });
    }
}
