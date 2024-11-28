const express = require('express');
const router = express.Router();
const procuraController = require('../controllers/procura.controller');

// Rota para procurar provas
router.post('/procuraProva', procuraController.procurarProva);

module.exports = router;
