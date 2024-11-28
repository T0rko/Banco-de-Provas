const router = require('express-promise-router')();

const provaController = require('../controllers/prova.controller');

router.post('/prova', provaController.registerExam);

router.post('/registerExam', provaController.registerExam);

module.exports = router;
