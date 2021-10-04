// teams controller
const { response } = require('express');
const Team = require("../models/teams");

// obtener equipos /teams
const equiposGetAll = (req, res = response) => {
    Team.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Error al buscar equipos getAll"
            });
        else res.json(data);
    });
}


module.exports = { 
  equiposGetAll
}