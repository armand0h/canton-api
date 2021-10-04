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

# Endpoints

## Obtener clientes
    get http://localhost:8080/clients
## Obtener cliente por id
    get http://localhost:8080/clients/1
## Obtener usuarios
    get http://localhost:8080/users
## Obtener usuario por id
get http://localhost:8080/users/1
## Obtener ventas por equipo
    get http://localhost:8080/sales/team/1
## Obtener ventas por usuario
    get http://localhost:8080/sales/users/1

## Obtener equipos
    get http://localhost:8080/teams
## Obtener usuarios por equipo
    get http://localhost:8080/users/team/1

## Obtener detalles de ventas
    get http://localhost:8080/sales/team/1/user/1
    Nota:
        team/0/user/0   todas las ventas
        team/1/user/0   ventas equipo 1
        team/0/user/1   ventas usuario 1
        team/1/user/2   ventas usuario 2 del equipo 1