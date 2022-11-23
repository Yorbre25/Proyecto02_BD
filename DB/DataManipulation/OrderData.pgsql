

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


CREATE OR REPLACE FUNCTION Get_Order_Cli(in_idCli int)
returns setof Full_Order
LANGUAGE sql
AS $$
  Select * from Full_Order where ClientId = in_idCli
$$;

-- Insert order
create or replace procedure Insert_order( 
    In_Province varchar(15),
    In_City varchar(15),
    In_District varchar(15),
    In_ClientId int,
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
    ClientId
  )VALUES(
    In_Province,
    In_City,
    In_District,
    In_ClientId
  ) RETURNING ID Into id_var;

  call insert_order_products(id_var, In_Products, In_numProducts);
  call set_order_total(id_var);
  call set_deliveryman(id_var, In_Province, In_City, In_District);
end; $$;


-- Set the deliveryman who delivers the order
create or replace procedure set_deliveryman(
  OrderId int, 
  OrderProvince varchar(15),
  OrderCity varchar(15),
  OrderDistrict varchar(15))
language plpgsql
as $$
declare VarDelManId int;
begin

  Select D.id into VarDelManId from deliveryman as D where D.District = OrderDistrict limit 1;

  IF VarDelManId is Null THEN
    Select D.id into VarDelManId from deliveryman as D where D.City = OrderCity limit 1;
  END IF;
  IF VarDelManId is NULL THEN
    Select D.id into VarDelManId from deliveryman as D where D.province = OrderProvince limit 1;
  END IF;
  IF VarDelManId is NULL THEN
    SELECT D.id into VarDelManId FROM Deliveryman as D order by random() LIMIT 1;
  END IF;
  
  Update _order set delmanid = VarDelManId where Id = OrderId;
  Update deliveryman set available = false where Id = VarDelManId;
end; $$;


-- Compute the total price of the order
create or replace procedure Set_Order_Total(In_OrderId int)
language plpgsql
as $$
declare id_var int;
begin
  update _Order 
      set Total = (
          select sum(P.Price*OP.Quantity)
          from Order_Products as OP 
          join Product as P on OP.ProductBarCode = P.BarCode
          where OP.OrderId = In_OrderId
          group by OP.OrderId)
      where Id = In_OrderId;
end; $$;

create or replace procedure Order_Delivered(In_OrderId int)
language plpgsql
as $$
declare id_var int;
begin
  update _Order 
  set 
    Status = 'Entregado'
  where Id = In_OrderId;
  
  update deliveryman 
  set 
    available = true 
  where Id = (
    select delmanid 
    from _order 
    where Id = In_OrderId);
    
end; $$;


--Update order
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



--Delete order
create or replace procedure Delete_Order(In_Id int)
language plpgsql
as $$
begin

    call delete_Order_Products(In_Id);
    DELETE from _Order
    where Id = In_Id;

end; $$
