// teams model
const db = require("./db");

// obtener equipos
const getAll = result => {
    db.query("SELECT * FROM teams", (err, res) => {
        if (err) {
            console.log("error teams getAll ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

module.exports = { 
    getAll
}