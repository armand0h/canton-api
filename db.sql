-- Table `teams`
CREATE TABLE IF NOT EXISTS `teams` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) )
ENGINE = InnoDB;

-- Data Table `teams`
INSERT INTO teams VALUES 
	(NULL, 'Team_1'), 
	(NULL, 'Team_2');


-- Table `users`
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `teamId` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) ,
  INDEX `fk_users_teams_idx` (`teamId` ASC) ,
  CONSTRAINT `fk_users_teams`
    FOREIGN KEY (`teamId`)
    REFERENCES `teams` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- Data Table `users`
INSERT INTO users VALUES 
	(NULL, 'User 1',1), 
	(NULL, 'User 2',1), 
	(NULL, 'User 3',2), 
	(NULL, 'User 4',2);


-- Table `clients`
CREATE TABLE IF NOT EXISTS `clients` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) )
ENGINE = InnoDB;

-- Data Table `clients`
INSERT INTO clients VALUES 
	(NULL, 'Client_1'), 
	(NULL, 'Client_2'), 
	(NULL, 'Client_3'), 
	(NULL, 'Client_4');

-- Table `sales`
CREATE TABLE IF NOT EXISTS `sales` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `createdAt` DATETIME NOT NULL,
  `amount` FLOAT NOT NULL,
  `clientId` INT UNSIGNED NOT NULL,
  `userId` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
  INDEX `fk_sales_clients1_idx` (`clientId` ASC) ,
  INDEX `fk_sales_users1_idx` (`userId` ASC) ,
  CONSTRAINT `fk_sales_clients1`
    FOREIGN KEY (`clientId`)
    REFERENCES `clients` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sales_users1`
    FOREIGN KEY (`userId`)
    REFERENCES `users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- Data Table `sales`

INSERT INTO sales VALUES 
	(NULL, '2021-05-03 12:30:00', 35000,1,4),
	( NULL, '2021-05-04 12:30:00', 20000, 1, 4 ),
	( NULL, '2021-05-05 12:30:00', 25000, 2, 3 ),
	( NULL, '2021-05-06 12:30:00', 11000, 2, 3 ),
	( NULL, '2021-07-06 12:30:00', 10000, 2, 3 ),
	( NULL, '2021-06-05 12:30:00', 40000, 3, 2 ),
	( NULL, '2021-07-06 12:30:00', 10000, 3, 2 ),
	( NULL, '2021-07-06 12:30:00', 10000, 4, 1 );



-- Consulta de detalle de ventas por usuario
SELECT s.id AS 'id_venta', date_format(s.createdAt, '%d/%m/%Y %H:%i') AS 'fecha_venta_dmY', c.name AS 'nombre_cliente', 
FORMAT(s.amount, 2) AS 'monto_venta', t.name AS 'nombre_equipo', u.name AS 'nombre_usuario'
FROM sales AS s 
INNER JOIN clients AS c ON s.clientId = c.id
INNER JOIN users AS u ON s.userId = u.id
INNER JOIN teams AS t on u.teamId = t.id
ORDER BY u.id ASC;

-- Ventas por equipo
SELECT t.name AS 'nombre_equipo', FORMAT(sum(s.amount), 2) as 'venta_total_equipo'
FROM sales AS s
INNER JOIN users AS u ON s.userId = u.id
INNER JOIN teams as t ON u.teamId = t.id
GROUP BY t.id;

-- Ventas por equipo -> mes
SELECT t.name AS 'nombre_equipo', date_format(s.createdAt, '%m/%Y') AS 'mes_anio', 
FORMAT(sum(s.amount), 2) as 'venta_total_equipo'
FROM sales AS s
INNER JOIN users AS u ON s.userId = u.id
INNER JOIN teams AS t ON u.teamId = t.id
GROUP BY t.id, date_format(s.createdAt, '%m/%Y') 
ORDER BY t.id, date_format(s.createdAt, '%m/%Y') ASC;

-- Ventas por usuario
SELECT u.name AS 'nombre_usuario', FORMAT(sum(s.amount), 2) AS 'venta_total'
FROM sales AS s
INNER JOIN users AS u ON s.userId = u.id
GROUP BY u.id;

-- Ventas por usuario -> mes
SELECT u.name AS 'nombre_usuario', date_format(s.createdAt, '%m/%Y') AS 'mes_anio', 
FORMAT(sum(s.amount), 2) as 'venta_mes_usuario'
FROM sales AS s
INNER JOIN users AS u ON s.userId = u.id
GROUP BY u.id, date_format(s.createdAt, '%m/%Y') 
ORDER BY u.id, date_format(s.createdAt, '%m/%Y') ASC;

-- Ventas por mes
SELECT date_format(s.createdAt, '%m/%Y') AS 'mes_anio', 
FORMAT(sum(s.amount), 2) as 'venta_mes'
FROM sales AS s
GROUP BY date_format(s.createdAt, '%m/%Y') 
ORDER BY date_format(s.createdAt, '%m/%Y')  ASC;




