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

-- Insert new product
create or replace procedure Insert_Product(
  In_BarCode int,
  In_Price decimal(10,2),
	In_Name varchar(15),
  In_CategoryId int,
  In_Store int
)
language plpgsql
as $$
begin
  INSERT INTO Product(	
      BarCode,
      Price,
      Name,
      CategoryId
  )
  VALUES(
      In_BarCode,
      In_Price,
      In_Name,
      In_CategoryId
  );
  Insert into store_products(StoreId,ProductBarCode)
  Values(In_Store,In_BarCode);
COMMIT;
end; $$;

-- insert product photo
create or replace procedure Insert_Product_Photo(
  In_ProductBarCode int,
  In_photo varchar(50)
)
language plpgsql
as $$
begin
  INSERT INTO product_photos(	
      ProductBarCode,
      Photo
  )
  VALUES(
      In_ProductBarCode,
      In_photo
  );
end; $$;


-- Update product
create or replace procedure Update_Product(
  In_BarCode int,
  In_Price decimal(10,2),
	In_Name varchar(15),
  In_CategoryId int,
  In_Store int
)
language plpgsql
as $$
begin

  UPDATE Product set
      Price = In_Price,
      Name = In_Name,
      CategoryId = In_CategoryId
  WHERE barcode = In_BarCode;
  
  update store_products set
    StoreId = In_Store
  where ProductBarCode = In_BarCode;

end; $$;

-- Delete product
create or replace procedure Delete_Product(In_ProductBarCode int)
language plpgsql
as $$
begin

    Delete from store_products
    where ProductBarCode = In_ProductBarCode;

    Delete from product_photos
    where ProductBarCode = In_ProductBarCode;
    
    DELETE from product
    where barcode = In_ProductBarCode;

end; $$