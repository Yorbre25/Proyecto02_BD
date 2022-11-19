-- SCRIPT DE POPULACION

INSERT INTO Administrator(
	Id,
	Name,
	LastName1,
	LastName2,
	Email,
	Province,
	City,
	District,
	Username, 
	Password)
Values
	(1234567, 'AdminName', 'AdminL1', 'AdminL2', 'admin@gmail.com', 'Cartago', 'Cartago', 'Cartago', 'admin', 'ABC123'),
	(1234568, 'Carlos', 'Salas', 'Fernandez', 'csssfd97@gmail.com', 'Puntarenas', 'Jaco', 'Isla bonita', 'csssfd97', 'ABC123');


INSERT INTO Deliveryman(
	Id,
	Name,
	LastName1,
	LastName2,
	Email,
	Province,
	City,
	District,
	Username,
	Password)
Values
	(756345, 'Ricardo', 'Gatgens', 'Rodriguez', 'gatgens48@gmail.com', 'Alajuela', 'SanRamón', 'Yonoseque Norte', 'pelos', 'ABC123'),
	(2763495, 'Rahel', 'Avila', 'Agilar', 'rahelavi@gmail.com', 'Guanacaste', 'Nicoya', 'Santa Rosa', 'rahelia', 'ABC123');


INSERT INTO Deliveryman_Phones(
	delmanid,
	PhoneNumber)
Values
	(756345, '87654321'),
	(756345, '25791234'),
	(2763495, '48765651');


INSERT INTO Product_Category(Name)
Values
	('Comida Rápida'),
	('Medicamentos'),
	('Suplementos'),
	('Platillos'),
	('Combo'),
	('Bebidas');

INSERT INTO Store_Type(Name)
Values
	('Tienda'),
	('Restaurante'),
	('Farmacia'),
	('Supermercado');

	
