// usuarios controller
const { response } = require('express');
const User = require("../models/users");

// obtener usuarios /users
const usuariosGetAll = (req, res = response) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Error al buscar usuarios getAll"
            });
        else res.json(data);
    });
}

// obtener un usuario /users/{id}
const usuariosGetOne = (req, res = response) => {
    const { id } = req.params;

    User.getOne( id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Usuario no encontrado id ${ id }.`
              });
            } else {
              res.status(500).send({
                message: `Error de servidor usuario id ${ id }`
              });
            }
          } else res.json(data);
    });
}

// Obtener todos los usuarios por equipo  /users/team/{id}
const usuariosTeamGetAll = (req, res = response) => {
    const { id } = req.params;

    User.getByTeam( id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Usuarios de equipo no encontrados id ${ id }.`
              });
            } else {
              res.status(500).send({
                message: `Error de servidor usuarios de equipo id ${ id }`
              });
            }
          } else res.json(data);
    });
}

module.exports = { 
    usuariosGetAll,
    usuariosGetOne,
    usuariosTeamGetAll
}