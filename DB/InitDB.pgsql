-- Initialization of DB


-- Delete all tables
DROP TABLE IF EXISTS
	Client,
	_Order,
	Deliveryman, 
	Deliveryman_Phones, 
	Product, 
	Product_Category, 
	Product_Photos, 
	Order_Products, 
	Store, 
	Store_Phones,
	Store_Type, 
	Store_Products, 
	Manager,
	Manager_Phones,
	Administrator
CASCADE;


create table Client
(
	Id int not null,
	Name varchar(15) not null,
	LastName1 varchar(15) not null,
	LastName2 varchar(15),
	Province char(15),
	City varchar(15),
	District varchar(15),
    PhoneNumber varchar(10),
    Username varchar(15) not null unique,
    BirthDate Date,
    Password text not null,
	PRIMARY KEY(ID)
);

create table _Order
(
    Id serial,
    Total decimal(10,2),
    Province varchar(15),
    City varchar(15),
    District varchar(15),
    ClientId int not null,
    DelManId int not null,
    PRIMARY KEY(Id)
);

create table Deliveryman
(
    Id int not null,
    Username varchar(15) not null unique,
    Name varchar(15) not null,
    LastName1 varchar(15) not null,
    LastName2 varchar(15),
	Email varchar(40),
    Province char(15),
    City varchar(15),
    District varchar(15),
    Password text not null,
    PRIMARY KEY(Id)
);

create table Deliveryman_Phones(
    DelManId int not null,
    PhoneNumber varchar(10) not null,
	PRIMARY KEY (DelManId, PhoneNumber)
);

create table Product(
    BarCode serial,
    Price decimal(10,2) not null,
    Name varchar(15) not null,
    CategoryId int not null,
    PRIMARY KEY(BarCode)
);

create table Product_Category(
    Id serial,
    Name varchar(15) not null,
    PRIMARY KEY(Id)
);

create table Product_Photos(
    ProductBarCode int not null,
    Photo varchar(50) not null, -- AQUÍ IRÍA UNA IMAGEN
	Primary key(ProductBarCode, Photo)
);

create table Order_Products(
    OrderId int not null,
    ProductBarCode int not null,
    Quantity int not null,
	Primary Key(ProductBarCode, OrderId)
);


create table Store(
    Id int not null,
    Name varchar(15) not null,
    Email varchar(40) not null,
    Province varchar(15),
    City varchar(15),
    District varchar(15),
    StoreTypeId int not null,
	ManagerId int not null, 
    PRIMARY KEY(Id)
);

create table Store_Phones( 
	StoreId int not null,
	PhoneNumber varchar(40),
	Primary Key(StoreId, PhoneNumber)
);
create table Store_Type(
    Id serial,
    Name varchar(15) not null,
    PRIMARY KEY(Id)
);

create table Store_Products(
    StoreId int not null,
    ProductBarCode int not null,
	Primary Key(StoreId, ProductBarCode)
);

create table Manager(
    Id int not null,
    Username varchar(15) not null unique,
    Name varchar(15) not null,
    LastName1 varchar(15) not null,
    LastName2 varchar(15),
    Email varchar(40) not null,
    Province varchar(15),
    City varchar(15),
    District varchar(15),
    Password text not null,
    Primary Key(Id)
);

create table Manager_Phones( 
	ManagerId int not null,
	PhoneNumber varchar(10) not null,
	Primary key(ManagerId, PhoneNumber)
);

create table Administrator(
	Id int not null,
	Name varchar(15) not null,
	LastName1 varchar(15) not null,
	LastName2 varchar(15),
	Email varchar(40),
	Province varchar(15),
	City varchar(15),
	District varchar(15),
    Username varchar(15) not null unique,
   	Password text not null,
	Primary Key(Id)
);

-- Foreign Keys Order
ALTER TABLE _ORDER
ADD CONSTRAINT ORDER_CLIENTE
FOREIGN KEY (ClientId)
REFERENCES Client (Id)
ON UPDATE CASCADE;

ALTER TABLE _ORDER
ADD CONSTRAINT ORDER_DELIVERYMAN
FOREIGN KEY (DelManId)
REFERENCES Deliveryman(Id)
ON UPDATE CASCADE;

-- Foreign Keys Deliveryman_Phones
ALTER TABLE DELIVERYMAN_PHONES
ADD CONSTRAINT DELIVERYMAN_PHONES_DELIVERYMAN
FOREIGN KEY (DelManId)
REFERENCES Deliveryman (Id)
ON UPDATE CASCADE;

--Foreign Keys Order_Products
ALTER TABLE ORDER_PRODUCTS
ADD CONSTRAINT ORDER_PRODUCTS_PRODUCT
FOREIGN KEY (ProductBarCode)
REFERENCES Product (barCode)
ON UPDATE CASCADE;

ALTER TABLE ORDER_PRODUCTS
ADD CONSTRAINT ORDER_PRODUCTS_ORDER
FOREIGN KEY (OrderId)
REFERENCES _Order (Id)
ON UPDATE CASCADE;

--Foreign Keys Product
ALTER TABLE PRODUCT
ADD CONSTRAINT PRODUCT_CATEGORY
FOREIGN KEY (CategoryId)
REFERENCES Product_Category (Id)
ON UPDATE CASCADE;

--Foreign Keys Product_Photos
ALTER TABLE PRODUCT_PHOTOS
ADD CONSTRAINT PRODUCT_PHOTOS_PRODUCT
FOREIGN KEY (ProductBarCode)
REFERENCES Product (BarCode)
ON UPDATE CASCADE;

--Foreign Keys Store_Products
ALTER TABLE STORE_PRODUCTS
ADD CONSTRAINT STORE_PRODUCTS_PRODUCT
FOREIGN KEY (ProductBarCode)
REFERENCES Product (BarCode)
ON UPDATE CASCADE;

ALTER TABLE STORE_PRODUCTS
ADD CONSTRAINT STORE_PRODUCTS_STORE
FOREIGN KEY (StoreId)
REFERENCES Store (Id)
ON UPDATE CASCADE;

--Foreign Keys Store
ALTER TABLE STORE
ADD CONSTRAINT STORE_STORE_TYPE
FOREIGN KEY (StoreTypeId)
REFERENCES Store_Type (Id)
ON UPDATE CASCADE;

ALTER TABLE STORE
ADD CONSTRAINT STORE_MANAGER
FOREIGN KEY (ManagerId)
REFERENCES Manager(Id)
ON UPDATE CASCADE;

--Foreign Keys Store_Phones
ALTER TABLE STORE_PHONES
ADD CONSTRAINT STORE_STORE_PHONES
FOREIGN KEY (StoreId)
REFERENCES Store(Id)
ON UPDATE CASCADE;

--Foreign Keys Manager_Phones
ALTER TABLE MANAGER_PHONES
ADD CONSTRAINT MANAGER_MANAGER_PHONES
FOREIGN KEY (ManagerId)
REFERENCES Manager(Id)
ON UPDATE CASCADE;

