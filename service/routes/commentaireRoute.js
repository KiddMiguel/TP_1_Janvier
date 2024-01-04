const express = require('express');
const router = express.Router();
const commentaireController = require('../controllers/commentaireController');
const { authenticator } = require('../middlewares/middlewareCorrAdmin');

// Routes pour la table commentaire
router.get('/getAll', authenticator, commentaireController.getAllCommentaires);
router.get('/get/:id', authenticator, commentaireController.getCommentaire);
router.post('/add', authenticator, commentaireController.addCommentaire);
router.put('/edit/:id', authenticator, commentaireController.EditCommentaire);
router.delete('/delete/:id', authenticator, commentaireController.DeleteCommentaire); 

module.exports = router;
