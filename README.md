# Repositorio

git clone git@github.com:armand0h/canton-api.git

# Requisitos:
Node
Mysql

# Configuración: canton-api/.env

PORT=8080
DB_HOST=localhost
DB_USER={user}
DB_PASS={password}
DB_NAME={nombre_db}

# Instalación y servidor

cd canton-api
npm install
node app

# Rutas
get http://localhost:8080/clients
get http://localhost:8080/clients/1
get http://localhost:8080/users
get http://localhost:8080/users/1
get http://localhost:8080/sales/team/1
get http://localhost:8080/sales/users/1