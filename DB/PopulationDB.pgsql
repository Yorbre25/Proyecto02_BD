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
	(1234567, 'AdminName', 'AdminL1', 'AdminL2', 'admin@gmail.com', 'Cartago', 'Cartago', 'Cartago', 'admin', crypt('admin', gen_salt('bf')));

-- INSERT INTO Product_Category(Name)
-- Values
-- 	('Comida Rápida');

-- INSERT INTO Product(
-- 	BarCode,
-- 	Name,
-- 	Price,
-- 	CategoryId)
-- Values
-- 	(123, 'McNífica', '3500', 1);
	
