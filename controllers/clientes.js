// clientes controller
const { response } = require('express');
const Client = require("../models/clients");

// obtener clientes /clients
const clientesGetAll = (req, res = response) => {
    Client.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Error al buscar clientes getAll"
            });
        else res.json(data);
    });
}

// obtener un cliente /clients/{id}
const clientesGetOne = (req, res = response) => {
    const { id } = req.params;

    Client.getOne( id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Cliente no encontrado id ${ id }.`
              });
            } else {
              res.status(500).send({
                message: `Error de servidor cliente id ${ id }`
              });
            }
          } else res.json(data);
    });
}


module.exports = { 
    clientesGetAll,
    clientesGetOne
}