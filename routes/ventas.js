const { Router } = require('express');
const { ventasEquipo, ventasUsuario } = require('../controllers/ventas');

const router = Router();

// Obtener los usuarios
router.get('/team/:id', ventasEquipo );

// Obtener un usuario por id
router.get('/users/:id', ventasUsuario );

module.exports = router;