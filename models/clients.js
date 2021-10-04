// clients model
const db = require("./db");

// obtener clientes
const getAll = result => {
    db.query("SELECT * FROM clients", (err, res) => {
        if (err) {
            console.log("error clients getAll ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

// obtener un cliente por id
const getOne = (id, result) => {
    db.query(`SELECT * FROM clients WHERE id = ${ id }`, (err, res) => {
        if (err) {
            console.log("error clients getOne ", err);
            result(null, err);
            return;
        }
        if (res.length) {
            console.log("coincidencia: ", res[0]);
            result(null, res[0]);
            return;
          }
      
          result({ kind: "not_found" }, null);
    });
}


module.exports = { 
    getAll,
    getOne,
}