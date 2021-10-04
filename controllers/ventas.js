// usuarios controller
const { response } = require('express');
const Sales = require("../models/sales");

// obtener ventas por equipo /sales/team/{id}
const ventasEquipo = (req, res = response) => {
    const { id } = req.params;

    Sales.getByTeam( id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Ventas por equipo no encontradas id ${ id }.`
              });
            } else {
              res.status(500).send({
                message: `Error de servidor ventas por equipo id ${ id }`
              });
            }
          } else res.json(data);
    });
}

// obtener ventas por usuario /sales/users/{id}
const ventasUsuario = (req, res = response) => {
    const { id } = req.params;

    Sales.getByUser( id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Ventas de usuario no encontradas id ${ id }.`
              });
            } else {
              res.status(500).send({
                message: `Error de servidor ventas de usuario id ${ id }`
              });
            }
          } else res.json(data);
    });
}

// Obtener detalle de ventas /team/:teamId/user/:userId
const ventasDetalle = (req, res = response) => {
  const { teamId, userId } = req.params;

  Sales.getDetail( teamId, userId, (err, data) => {
      if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Detalle de Ventas no encontradas equipo id ${ teamId } user id ${ userId }.`
            });
          } else {
            res.status(500).send({
              message: `Error de servidor detalle ventas equipo id ${ teamId } user id ${ userId }.`
            });
          }
        } else res.json(data);
  });
}


module.exports = { 
    ventasEquipo,
    ventasUsuario,
    ventasDetalle
}