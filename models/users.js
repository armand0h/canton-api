// users model
const db = require("./db");

// obtener usuarios
const getAll = result => {
    db.query("SELECT * FROM users", (err, res) => {
        if (err) {
            console.log("error users getAll ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

// obtener un usuario por id
const getOne = (id, result) => {
    db.query(`SELECT * FROM users WHERE id = ${ id }`, (err, res) => {
        if (err) {
            console.log("error users getOne ", err);
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