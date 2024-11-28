const router = require('express-promise-router')();

const alunoController = require('../controllers/aluno.controller');

router.post('/aluno', alunoController.createAluno);

router.post('/signup', alunoController.createAluno);

module.exports = router;