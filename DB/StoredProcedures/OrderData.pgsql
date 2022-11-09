CREATE TYPE Full_Order as(
    Id int,
    Total decimal(10,2),
    ShippingAddress varchar(50),
    ClientName varchar(15),
    ClientLastName varchar(15),
    DelManName varchar(15),
    DelManLastName varchar(15),
    Products text
);

CREATE OR REPLACE FUNCTION Get_All_Orders()
returns setof Full_Order
LANGUAGE sql
AS $$
  select 
    O.Id,
    O.Total,
    O.ShippingAddress,
    C.Name as ClientName,
    C.LastName1 as ClientLastName,
    D.Name as DelManName,
    D.lastname1 as DelManLastName,
    array_to_string(array_agg(P.Name), ',') as Products
  from ((((_Order as O join Client as C on O.ClientId = C.id) 
  join Deliveryman as D on O.DelManId = D.id)
  join order_products as OP on O.Id = OP.OrderId)
  join Product as P on OP.ProductBarCode = P.barCode)
  group by O.id, C.Name, C.LastName1, D.Name, D.lastname1;
$$;

CREATE OR REPLACE FUNCTION Get_Order(in_id int)
returns setof Full_Order
LANGUAGE sql
AS $$
  select 
    O.Id,
    O.Total,
    O.ShippingAddress,
    C.Name as ClientName,
    C.LastName1 as ClientLastName,
    D.Name as DelManName,
    D.lastname1 as DelManLastName,
    array_to_string(array_agg(P.Name), ',') as Products
  from ((((_Order as O join Client as C on O.ClientId = C.id) 
  join Deliveryman as D on O.DelManId = D.id)
  join order_products as OP on O.Id = OP.OrderId)
  join Product as P on OP.ProductBarCode = P.barCode)
  WHERE O.Id = in_id
  group by O.id, C.Name, C.LastName1, D.Name, D.lastname1;
$$;