const db = require('../database/database');

exports.getAllCommentaires = async (req, res) => {
    try {
        const resultats = await db.query("SELECT * FROM commentaire");
        res.status(200).json(resultats);
        // Ajoutez res.render si vous avez une page correspondante
        // res.render('commentaires', { commentaires: resultats });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des commentaires", error });
    }
};

exports.addCommentaire = async (req, res) => {
    const {contenu, message, date, utilisateur_id } = req.body;
    try {
        await db.query("INSERT INTO commentaire (contenu, message, date, utilisateur_id) VALUES (?,?,?, ?)", [contenu, message, date, utilisateur_id]);
        res.status(201).json({ message: 'Commentaire ajouté avec succès' });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'ajout du commentaire", error });
    }
};

exports.getCommentaire = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await db.query("SELECT * FROM commentaire WHERE id = ?", [id]);
        if (result.length > 0) {
            res.status(200).json(result[0]);
            // Ajoutez res.render si vous avez une page correspondante
            // res.render('editCommentaire', { commentaire: result[0] });
        } else {
            res.status(404).json({ message: 'Commentaire non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération du commentaire", error });
    }
};

exports.EditCommentaire = async (req, res) => {
    const { id, contenu,message, date, utilisateur_id } = req.body;
    try {
        await db.query("UPDATE commentaire SET contenu = ?, message= ?, date = ?, utilisateur_id = ? WHERE id = ?", [contenu,message, date, utilisateur_id, id]);
        res.status(200).json({ message: 'Commentaire mis à jour avec succès' });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour du commentaire", error });
    }
};

exports.DeleteCommentaire = async (req, res) => {
    const id = req.params.id;
    try {
        await db.query("DELETE FROM commentaire WHERE id = ?", [id]);
        res.status(200).json({ message: 'Commentaire supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression du commentaire", error });
    }
};
