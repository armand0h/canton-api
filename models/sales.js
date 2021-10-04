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
            console.log("error sales getOne ", err);
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

// Obtener detalle de ventas
const getDetail = (teamId, userId, result) => {
    // Base query
    let query = `SELECT s.id AS 'id_venta', date_format(s.createdAt, '%d/%m/%Y %H:%i') AS 'fecha_venta_dmY', c.name AS 'nombre_cliente', 
    FORMAT(s.amount, 2) AS 'monto_venta', t.name AS 'nombre_equipo', u.name AS 'nombre_usuario'
    FROM sales AS s 
    INNER JOIN clients AS c ON s.clientId = c.id
    INNER JOIN users AS u ON s.userId = u.id
    INNER JOIN teams AS t on u.teamId = t.id `;

    // Condiciones de query
    if ( teamId > 0 && userId > 0 ) {
        query += ` WHERE t.id = ${ teamId } AND u.id = ${ userId } `;
    }
    if (teamId > 0 && userId == 0 ) {
        query += ` WHERE t.id = ${ teamId } `;
    }
    if (teamId == 0 && userId > 0 ) {
        query += ` WHERE u.id = ${ userId } `;
    }
    // order
    query += ` ORDER BY u.id ASC; `

    db.query( query, (err, res) => {
        if (err) {
            console.log("error sales getDetail ", err);
            result(null, err);
            return;
        }
        if (res.length) {
            console.log("coincidencia: ", res);
            result(null, res);
            return;
          }
      
          result({ kind: "not_found" }, null);
    });
}

module.exports = { 
    getByTeam,
    getByUser,
    getDetail
}