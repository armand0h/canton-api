const express = require('express')
const cors = require('cors');

class Server {
    constructor() {
        // crea express como una propiedad de server
        this.app = express();
        this.port = process.env.PORT;

        // Rutas disponibles
        this.usuariosPath = '/users';
        this.clientesPath = '/clients';
        this.ventasPath   = '/sales';

        this.middlewares();

        // mando a llamar las rutas
        this.routes();
    }


    middlewares(){
        // CORS
        this.app.use(cors());
        // Definimos directorio publico
        this.app.use(express.static('public'));
    }

    // manejador de las rutas
    routes() {
        // peticiones condicionales a usuarios
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
        // peticiones condicionales a clientes
        this.app.use(this.clientesPath, require('../routes/clientes'));
        // peticiones condicionales a ventas
        this.app.use(this.ventasPath, require('../routes/ventas'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("servidor en puerto ", this.port);
        });
    }
}

module.exports = Server;