const { Router } = require('express');
const { usuariosGetAll, usuariosGetOne } = require('../controllers/usuarios');

const router = Router();

// Obtener los usuarios
router.get('/', usuariosGetAll );

// Obtener un usuario por id
router.get('/:id', usuariosGetOne );

module.exports = router;