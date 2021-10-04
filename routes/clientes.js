const { Router } = require('express');
const { clientesGetAll, clientesGetOne } = require('../controllers/clientes');

const router = Router();

// Obtener los usuarios
router.get('/', clientesGetAll );

// Obtener un usuario por id
router.get('/:id', clientesGetOne );

module.exports = router;