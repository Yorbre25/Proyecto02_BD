--PROCEDURES client

SELECT * FROM Get_Client(303520771)

SELECT * From Get_All_Clients()


--PROCEDURES ADMIN

call Insert_Administrator(547835, 'Prueba', 'Prueba', 'Prueba', 'prueba@gmail.com', 'Prueba', 'Prueba', 'Prueba', 'prueba', 'ABC123');

SELECT * from Get_Administrator(547835);

SELECT * from Get_All_Administrators();

--PROCEDURES DELIVERYMAN
SELECT * from get_all_deliverymen();

SELECT * from get_deliveryman(756345);

--PROCEDURES PRODUCT
Select * from Get_All_Products();

Select * from Get_Product(123);
