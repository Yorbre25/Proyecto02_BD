
INSERT INTO Client(
	Id,
	Name,
	LastName1,
	LastName2,
    Birthdate,
	Province,
	City,
	District,
    PhoneNumber,
	Username, 
	Password)
Values
	(1234567, 'ClientName', 'ClientL1', 'ClientL2', '1990-12-12', 'Cartago', 'Cartago', 'Cartago', '88888888', 'client', crypt('client', gen_salt('bf'))),
	(303520771, 'Cristian', 'Smith', 'Ulloa', '1980-12-12','Cartago', 'Turrialba', 'La Suiza','77777777', 'crisnorris', crypt('ABC123', gen_salt('bf'))),
    (63423413, 'Juan', 'Perez', 'Gonzalez', '2000-12-12','San José', 'San José', 'San Pedro','99999999', 'juanPe', crypt('ABC123', gen_salt('bf')));


INSERT INTO Manager(
	Id,
	Name,
	Lastname1,
	Lastname2,
	Email,
	Province,
	City,
	District,
	Username,
	Password)
Values
	(237654, 'Adriana', 'Calderon', 'Barboza', 'cuadriante@gmail.com', 'Cartago', 'TresRios','TresRios', 'cuadriante', crypt('ABC123', gen_salt('bf'))),
	(123456, 'Anthony', 'Noc', 'Achoy', 'anto@gmail.com', 'Limon', 'Puerto Viejo', 'Manzanillo', 'chipsAchoy', crypt('ABC123', gen_salt('bf')));


INSERT INTO manager_phones(
	ManagerId,
	PhoneNumber)
Values
	(237654, '88888888'),
	(123456, '77777777');


INSERT into Store(
	Id,
	Name,
	Email,
	Province,
	City,
	District,
	ManagerId,
	Storetypeid)
VALUES
	(163235, 'McDennys', 'mcdennys@gmail.com', 'Cartago', 'Cartago', 'Las Ruinas', 237654, 2),
	(9759832, 'La Pichel', 'pichel@gmail.com', 'Guanacaste', 'Guanacatico', 'Guanacastek', 123456, 3);


INSERT INTO Store_phones(
	StoreId,
	PhoneNumber)
VALUES
	(163235, '88888888'),
	(9759832, '92345523'),
	(9759832, '77777777');


INSERT INTO Product(
	BarCode,
	Name,
	Price,
	CategoryId)
Values
	(123, 'McNífica', '3500', 1),
	(783, 'CocaCola 0', '800', 6),
	(934, 'Viagra', '2000', 2),
	(222, 'Panadol Noche', '500', 2),
	(333, 'CocaCola', '500', 6),
	(444, 'Casado', '500', 4),
	(555, 'Smirnoff', '500', 6);


INSERT INTO product_photos(
	ProductBarCode,
	Photo)
VALUES
	(123, 'https://www.mcdonalds.com'),
	(123, '://www.mcdonalds.com'),
	(783, 'https://www.cocacola.com'),
	(934, 'https://www.viagra.com');
	

Insert into Store_Products(
	StoreId,
	ProductBarCode)
VALUES
	(163235, 123),
	(163235, 783),
	(9759832, 934),
	(9759832, 222),
	(9759832, 333),
	(9759832, 444),
	(9759832, 555);


insert into _Order(
	Total,
	province,
	city,
	district,
	ClientId,
	DelManId)
VALUES
	('3500', 'Cartago', 'Cartago', 'Cartago', 1234567, 756345),
	('1200', 'Cartago', 'Cartago', 'Cartago', 303520771, 756345),
	('2500', 'Cartago', 'Cartago', 'Cartago', 303520771, 2763495),
	('3155', 'San José', 'San José', 'San José', 303520771, 756345),
	('2100', 'Limon', 'Limon', 'Limon', 1234567, 2763495);


Insert into Order_Products( -- Pasa algo raro aquí
	OrderId,
	ProductBarCode,
	Quantity)
VALUES
	(1, 123, 2),
	(1, 783, 1),
	(2, 934, 4),
	(2, 222, 1),
	(3, 333, 1),
	(3, 444, 1),
	(4, 555, 1);
	-- (3, 123, 3),
	-- (3, 545, 1);

