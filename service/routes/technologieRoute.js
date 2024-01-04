const express = require('express');
const router = express.Router();
const technologieController = require('../controllers/technologieController');
const { authenticator } = require('../middlewares/middlewareCorrAdmin');

// Routes pour la table technologiee
router.get('/getAll', authenticator, technologieController.getAllTechnologies);
router.get('/get/:id', authenticator, technologieController.getTechnoligie);
router.post('/add', authenticator, technologieController.addTechnoligie);
router.put('/edit/:id', authenticator, technologieController.EditTechnoligie);
router.delete('/delete/:id', authenticator, technologieController.DeleteTechnoligie);

module.exports = router;
