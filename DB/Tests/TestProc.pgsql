--PROCEDURES client
SELECT * From Get_All_Clients();
SELECT * from Get_Client(303520771);
call Insert_Client(11111, 'Prueba', 'Prueba', 'Prueba', 'Prueba', 'Prueba', 'Prueba', '6341235', 'prueba', '12/12/12', 'ABC123');
call Update_Client(11111, 5432, 'Triunfo', 'Prueba', 'Prueba', 'Prueba', 'Prueba', 'Prueba', '6341235', 'prueba', '12/12/12', 'ABC123');
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
call insert_deliveryman(1111,'prueba','prueba','prueba','prueba','prueba@gmail.com','prueba','prueba','prueba','ABC123',  array['48345125','75213421']);
call update_deliveryman(1111, 1361, 'Si así','prueba','prueba','prueba','prueba@gmail.com','prueba','prueba','prueba','ABC123',  array['48345125','cambio']);
call delete_deliveryman(1111);


--PROCEDURES PRODUCT
Select * from Get_All_Products();
Select * from Get_Product(123);
call Insert_Product(1234, '1500', 'Palomitas', 1, 9759832);
call Insert_Product_Photo(1234, 'C:\Users\Usuario\Desktop\palomitas.jpg');
call Update_Product(1234, '1500', 'Victoria', 1, 9759832);
call Delete_Product(1234);

--PROCEDURES PRODUCT_CATEGORY
Select * from Get_All_Product_Categories();
Select * from Get_Product_Category(1);
call Insert_Product_Category('Juguete');
call Update_Product_Category(1, 'Triunfo');
call Delete_Product_Category(7);

--Procedure STORE

select * from Get_All_Stores();
select * from Get_Store(163235);
call Insert_Store(5935, 'Prueba', 'prueba@gmail.com', 'Cargato', 'Cargato', 'Cargato', 1, 123456, array['48345125','cambio']);
call Update_Store(5935, 11, 'Triunfo', 'prueba@gmail.com', 'Cargato', 'Cargato', 'Cargato', 1, 123456, array['48345125','Chigugua']);
call Delete_Store(5935);
--Procedure STORE_TYPE

select * from Get_All_Store_Types();
select * from Get_Store_Type(1);
call Insert_Store_Type('Tienda');
call Update_Store_Type(1, 'Almacen');
call Delete_Store_Type(5);

--Procedure ORDER

select * from Get_All_Orders();
select * from Get_Order(1);
-- call insert_order('Por la parada de Transtusa', 1234567, 2763495, array[1234]);
-- insert into order_products(orderID, productbarcode, quantity) values (5, 934, 2);
call delete_Order(8);


--Procedure Manager

select * from Get_All_Managers();
select * from Get_Manager(237654);
call Insert_Manager(1111, 'Prueba', 'Prueba', 'Prueba', 'Prueba', 'prueba@gmail.com', 'Cartago', 'TresRios','TresRios', 'ABC123', array['12341234', '234521']);
call Update_Manager(1111, 1234, 'Triunfo', 'Prueba', 'Prueba', 'Prueba', 'prueba@gmail.com', 'Cartago', 'TresRios','TresRios', 'ABC123', array['victoria', '234521']);
call Delete_Manager(1111);

-- Procedure Passwords

select * from Get_Admin_Password(237654);
select * from Get_Client_Password(237654);
select * from Get_Manager_Password(237654);

-- Procedure Phones
call insert_deliveryman_phones(756345, array['12341234', '234521']);
call Update_Deliveryman_Phones(1111, array['12341234', '234521']);
call insert_manager_phones(123456, array['12341234', '234521']);
call update_manager_phones(1111, array['laksg', '234521']);
call delete_manager_phones(1111);

-- Procedure Reports
select * from get_Sales_Per_Client();
select * from get_Sales_Per_Store();