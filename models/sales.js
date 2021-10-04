// sales model
const db = require("./db");

// obtener ventas por equipo
const getByTeam = (id, result) => {
    db.query(`SELECT t.name AS 'nombre_equipo', FORMAT(sum(s.amount), 2) as 'venta_total_equipo' 
    FROM sales AS s 
    INNER JOIN users AS u ON s.userId = u.id 
    INNER JOIN teams as t ON u.teamId = t.id 
    WHERE t.id = ${ id } 
    GROUP BY t.id;`, 
        (err, res) => {
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

// obtener ventas por usuario
const getByUser = (id, result) => {
    db.query(`SELECT u.name AS 'nombre_usuario', FORMAT(sum(s.amount), 2) AS 'venta_total'
    FROM sales AS s
    INNER JOIN users AS u ON s.userId = u.id
    WHERE u.id = ${ id }
    GROUP BY u.id; `, (err, res) => {
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
    getByTeam,
    getByUser,
}