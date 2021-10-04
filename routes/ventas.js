const { Router } = require('express');
const { ventasEquipo, ventasUsuario, ventasDetalle } = require('../controllers/ventas');

const router = Router();

// Obtener los usuarios
router.get('/team/:id', ventasEquipo );

// Obtener un usuario por id
router.get('/users/:id', ventasUsuario );

// detalle de ventas por equipo
router.get('/team/:teamId/user/:userId', ventasDetalle );

module.exports = router;