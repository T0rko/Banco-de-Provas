const router = require('express-promise-router')();

const avaliaController = require('../controllers/avalia.controller');

router.post('/avaliacao', avaliaController.createAvalia);

router.get('/avaliacoes/:idProva', avaliaController.getAvaliacoesByProva);

module.exports = router;