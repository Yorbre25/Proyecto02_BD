--PROCEDURES client
SELECT * From Get_All_Clients();
SELECT * from Get_Client(303520771);
call Insert_Client(11111, 'Prueba', 'Prueba', 'Prueba', 'Prueba', 'Prueba', 'Prueba', '6341235', 'prueba', '12/12/12', 'ABC123');
call Update_Client(11111, 'Triunfo', 'Prueba', 'Prueba', 'Prueba', 'Prueba', 'Prueba', '6341235', 'prueba', '12/12/12', 'ABC123');
call delete_client(11111);


--PROCEDURES ADMIN
SELECT * from Get_All_Administrators();
Select * from Get_Administrator(547835);
call Insert_Administrator(547835, 'Prueba', 'Prueba', 'Prueba', 'prueba@gmail.com', 'Prueba', 'Prueba', 'Prueba', 'prueba', 'ABC123');
call Update_Administrator(547835, 'Triunfo', 'Prueba', 'Prueba', 'prueba@gmail.com', 'Prueba', 'Prueba', 'Prueba', 'prueba', 'ABC123');
call Delete_Administrator(547835);


--PROCEDURES DELIVERYMAN
SELECT * from get_all_deliverymen();
SELECT * from get_deliveryman(756345);

DECLARE @deliveryman_phones deliveryman_phones

INSERT INTO @deliveryman_phones VALUES (1111, '12341234')
INSERT INTO @deliveryman_phones VALUES (1111, '234521')

call insert_deliveryman(1111,'prueba','prueba','prueba','prueba','prueba@gmail.com','prueba','prueba','prueba','ABC123', @deliveryman_phones);


--PROCEDURES PRODUCT
Select * from Get_All_Products();

Select * from Get_Product(123);

--PROCEDURES PRODUCT_CATEGORY
Select * from Get_All_Product_Categories();

Select * from Get_Product_Category(1);

--Procedure STORE

select * from Get_All_Stores();

select * from Get_Store(163235);

--Procedure STORE_TYPE

select * from Get_All_Store_Types();

select * from Get_Store_Type(1);

--Procedure ORDER

select * from Get_All_Orders();

select * from Get_Order(1);

--Procedure Manager

select * from Get_All_Managers();

select * from Get_Manager(237654);