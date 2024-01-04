const express = require('express')
const router = express.Router();
const utilisateurController = require('../controllers/utilisateurController')
const middleware = require('../middlewares/middleware')

// mettre les routes de notre table celebrite:
router.get('/getAll', middleware.authenticator, utilisateurController.getAllUtilisateurs)
router.post('/auth/register', utilisateurController.register, utilisateurController.login)
router.post('/auth/login', utilisateurController.login)
router.put('/edit', middleware.authenticator, utilisateurController.EditUtilisateur)

module.exports = router