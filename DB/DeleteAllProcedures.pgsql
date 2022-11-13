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
drop procedure if exists insert_deliveryman;
drop procedure if exists update_deliveryman;
drop procedure if exists delete_deliveryman;

--Drop Product
drop function if exists get_all_products;
drop function if exists get_product;
drop procedure if exists Insert_Product;
drop procedure if exists Insert_Product_Photo;
drop procedure if exists Delete_Product;
drop procedure if exists Update_Product;
drop type if EXISTS Full_Product;


--Drop Product_Category
drop function if exists Get_All_Product_Categories;
drop function if exists Get_Product_Category;
drop procedure if exists Insert_Product_Category;
drop procedure if exists Update_Product_Category;
drop procedure if exists Delete_Product_Category;

--Drop Store
drop function if exists get_all_stores;
drop function if exists Get_Store;
drop type if EXISTS Full_Store;
drop procedure if exists Insert_Store;
drop procedure if exists Update_Store;
drop procedure if exists Delete_Store;

--Drop Store_Type
drop function if exists Get_All_Store_Types;
drop function if exists Get_Store_Type;
drop procedure if exists Insert_Store_Type;
drop procedure if exists Update_Store_Type;
drop procedure if exists Delete_Store_Type;

--Drop Order
drop function if exists get_all_orders;
drop function if exists get_order;
drop type if EXISTS Full_Order;
drop procedure if exists insert_order;
drop procedure if exists update_order;
drop procedure if exists delete_order;

--Drop Manager
drop function if exists get_all_managers;
drop function if exists get_manager;
drop type if EXISTS Full_Manager;
drop procedure if exists insert_manager;
drop procedure if exists update_manager;
drop procedure if exists delete_manager;
