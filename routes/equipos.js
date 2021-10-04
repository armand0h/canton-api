const { Router } = require('express');
const { equiposGetAll } = require('../controllers/equipos');

const router = Router();

// Obtener los usuarios
router.get('/', equiposGetAll );

module.exports = router;