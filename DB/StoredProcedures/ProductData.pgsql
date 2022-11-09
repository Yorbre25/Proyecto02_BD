CREATE TYPE Full_Product as(
    BarCode int,
    Price decimal(10,2),
    Name varchar(15),
    CategoryName varchar(15)
);

--- get all products
CREATE OR REPLACE FUNCTION Get_All_Products()
returns setof Full_Product
LANGUAGE sql
AS $$
  select P.BarCode, P.Price, P.Name, PC.Name as CategoryName
  from Product as P join Product_Category as PC on P.CategoryId = PC.Id
$$;


--get product by barCode
create or replace function Get_Product(in_barCode int)
returns setof Full_Product
LANGUAGE sql
AS $$
  select P.BarCode, P.Price, P.Name, PC.Name as CategoryName
  from Product as P join Product_Category as PC on P.CategoryId = PC.Id
  WHERE barcode = in_barCode;
$$;

