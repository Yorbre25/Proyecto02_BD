

CREATE OR REPLACE FUNCTION Get_All_Orders()
returns setof Full_Order
LANGUAGE sql
AS $$
  Select * from Full_Order
$$;

CREATE OR REPLACE FUNCTION Get_Order(in_id int)
returns setof Full_Order
LANGUAGE sql
AS $$
  Select * from Full_Order where Id = in_id
$$;


-- Insert order
create or replace procedure Insert_order( 
    In_Province varchar(15),
    In_City varchar(15),
    In_District varchar(15),
    In_ClientId int,
    In_DelManId int,
    In_Products int Array,
    In_numProducts int Array
)
language plpgsql
as $$
declare id_var int;
begin

  INSERT INTO _Order(
    Province,
    City,
    District,
    ClientId,
    DelManId
  )VALUES(
    In_Province,
    In_City,
    In_District,
    In_ClientId,
    In_DelManId
  ) RETURNING ID Into id_var;

  call insert_order_products (id_var, In_Products, In_numProducts);

end; $$;

create or replace procedure Update_Order(
    In_Old_Id int,
    In_Id int,
    In_Province varchar(15),
    In_City varchar(15),
    In_District varchar(15),
    In_ClientId int,
    In_DelManId int,
    In_Products int Array,
    In_numProducts int Array
)
language plpgsql
as $$
begin

  call Update_Order_Products(In_Old_Id, In_Products, In_numProducts);
  Update _Order
  set 
    Id = In_Id,
    Province = In_Province,
    City = In_City,
    District = In_District,
    ClientId = In_ClientId,
    DelManId = In_DelManId
  where Id = In_Old_Id;
    
end; $$;




-- -- GET ORDER TOTAL
-- create or replace function sum_products(in_products int array, In_numProducts int array) --!SUMA LOS PRODUCTOS UNA VEZ
-- returns setof decimal(10,2)
-- LANGUAGE sql
-- AS $$
--   select Sum(P.Price*numProducts) as Total
--   from Product as P
--   where P.BarCode = ANY(in_products);
-- $$;


--Delete order
create or replace procedure Delete_Order(In_Id int)
language plpgsql
as $$
begin

    call delete_Order_Products(In_Id);
    DELETE from _Order
    where Id = In_Id;

end; $$
