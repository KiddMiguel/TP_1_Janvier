const db = require('../database/database');

exports.getAllTechnologies = async (req, res) => {
    try {
        const resultat = await db.query("SELECT * FROM technologie");
        res.status(200).json(resultat);
        res.render('technologies', { 
            technologies: resultat, 
        });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des technologies", error });
    }
};

exports.addTechnoligie = async (req, res) => {
    const { nom, date_creation, utilisateur_id } = req.query;
    try {
         await db.query("INSERT INTO technologie (nom, date_creation, utilisateur_id) VALUES (?, ?, ?)", [nom, date_creation, utilisateur_id]);
        res.status(201).json({ message: 'Technologie ajoutée avec succès' });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'ajout de la technologie", error });
    }
};
exports.getTechnoligie = async (req, res) => {
    const id = req.body.id; 
    try {
        const result = await db.query("SELECT * FROM technologie WHERE id = ?", [id]);
        if (result.length > 0) {
            //dECOMMENTER POUR AFFICHER LA PAGE EDITTECHNOLOGIE
            // res.render('editTechnologie', { technologie: result[0] }); 
            res.status(200).json(result[0]);
        } else {
            res.status(404).json({ message: 'Technologie non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de la technologie", error });
    }
};


exports.EditTechnoligie = async (req, res) => {
    const { id, nom, date_creation, utilisateur_id } = req.body;
    try {
        await db.query("UPDATE technologie SET nom = ?, date_creation = ?, utilisateur_id = ? WHERE id = ?", [nom, date_creation, utilisateur_id, id]);
        res.status(200).json({ message: 'Technologie mise à jour avec succès' });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour de la technologie", error });
    }
};

exports.DeleteTechnoligie = async (req, res) => {
    const id = req.body.id; 
    try {
        await db.query("DELETE FROM technologie WHERE id = ?", [id]);
        res.status(200).json({ message: 'Technologie supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression de la technologie", error });
    }
};

