--DELETE ALL PROCEDURES, FUNCTIONS AND TYPES

--Drop Administrator
drop function if exists Get_All_Administrators;
drop PROCEDURE if exists Get_Administrator;
drop function if exists Get_Administrator;
drop procedure if exists Insert_Administrator;
drop procedure if exists Update_Administrator;
drop procedure if exists Delete_Administrator;
--Drop Client
drop function if exists get_all_clients;
drop function if exists get_client;
drop procedure if EXISTS get_client;
drop procedure if EXISTS Insert_client;
drop procedure if EXISTS Update_client;
drop procedure if EXISTS Delete_client;

--Drop Deliveryman
drop function if exists get_all_deliverymen;
drop function if exists get_deliveryman;
drop TYPE if EXISTS Full_Deliveryman;

--Drop Product
drop function if exists get_all_products;
drop function if exists get_product;
drop type if EXISTS Full_Product;

drop function if exists Get_All_Product_Categories;
drop function if exists Get_Product_Category;

--Drop Store
drop function if exists get_all_stores;
drop function if exists Get_Store;
drop type if EXISTS Full_Store;

--Drop Store_Type
drop function if exists Get_All_Store_Types;
drop function if exists Get_Store_Type;

--Drop Order
drop function if exists get_all_orders;
drop function if exists get_order;
drop type if EXISTS Full_Order;

--Drop Manager
drop function if exists get_all_managers;
drop function if exists get_manager;
drop type if EXISTS Full_Manager;

--Drop GenericPhoneNumber
drop type if EXISTS GenericPhoneNumber;
