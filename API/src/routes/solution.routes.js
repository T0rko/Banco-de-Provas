const express = require('express');
const router = express.Router();
const solutionController = require('../controllers/solution.controller');

// Rota para registrar uma solução
router.post('/registerSolution', solutionController.registerSolution);

module.exports = router;
