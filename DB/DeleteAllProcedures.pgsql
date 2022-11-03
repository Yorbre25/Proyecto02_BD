--DELETE ALL PROCEDURES, FUNCTIONS AND TYPES

--Drop Administrator
drop function if exists Get_All_Administrators;
drop function if exists Get_Administrator;
drop procedure if exists Insert_Administrator;

--Drop Client
drop function if exists get_all_clients;
drop function if exists get_client;

--Drop Deliveryman
drop function if exists get_all_deliverymen;
drop function if exists get_deliveryman;
drop TYPE if EXISTS Full_Deliveryman;

--Drop Product
drop function if exists get_all_products;
drop function if exists get_product;
drop type if EXISTS Full_Product;