const { Router } = require('express');
const { usuariosGetAll, usuariosGetOne, usuariosTeamGetAll } = require('../controllers/usuarios');

const router = Router();

// Obtener los usuarios
router.get('/', usuariosGetAll );

// Obtener un usuario por id
router.get('/:id', usuariosGetOne );

// Obtener usuarios por equipo
router.get('/team/:id', usuariosTeamGetAll );

module.exports = router;