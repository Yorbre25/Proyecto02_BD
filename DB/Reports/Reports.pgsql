--Total sales per Client group by deliverymen and store
create or replace view Sales_Per_Client AS
    Select C.Name as ClientName, C.LastName1 as ClientLastName, count(O.id) as Cantidad, S.Name as StoreName, D.Name as DeliverymanName, D.LastName1 as DeliverymanLastname, Sum(O.Total) as Total
    From ((((((_Order as O join Client as C on O.ClientId = C.Id)
        join deliveryman as D on O.DelManId = D.Id)
        join Order_Products as OP on O.Id = OP.OrderId)
        join Product as P on OP.ProductBarCode = P.BarCode)
        join Store_Products as SP on SP.ProductBarCode = P.BarCode)
        join Store as S on SP.StoreId = S.Id)
    group by C.Name, C.LastName1, S.Name, D.Name, D.LastName1; 

-- Return Sales_Per_Client view
create or replace FUNCTION get_Sales_Per_Client()
returns setof Sales_Per_Client
LANGUAGE sql
AS $$
  select *
  from sales_per_client;
$$;

-- Total sales per Store
create or replace view Sales_Per_Store as
    Select S.Name as StoreName, count(O.id) as Cantidad, Sum(O.Total) as Total
    From (_Order as O join order_products as OP on O.Id = OP.OrderId)
        join Store_Products as SP on SP.ProductBarCode = OP.ProductBarCode
        join Store as S on SP.StoreId = S.Id
    group by S.Name;


--Return Sales_Per_Store view
create or replace FUNCTION get_Sales_Per_Store()
returns setof Sales_per_store
LANGUAGE sql
AS $$
  select *
  from sales_per_store;
$$;