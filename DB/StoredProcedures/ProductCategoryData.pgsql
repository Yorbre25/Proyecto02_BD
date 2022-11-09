--get all product_categories
CREATE OR REPLACE FUNCTION Get_All_Product_Categories()
returns setof product_category
LANGUAGE sql
AS $$
  select *
  from product_category;
$$;


--get an product_categories by id
create or replace function Get_Product_Category(In_Id int)
returns setof product_category
LANGUAGE sql
AS $$
  select *
  from product_category
  where id = In_Id;
$$;

--Insert product_category
create or replace procedure Insert_Product_Category(In_Name varchar(15))
language plpgsql
as $$
begin

  INSERT INTO Product_Category(Name)
  VALUES(In_Name);
  
end; $$;

-- Update product_category
create or replace procedure Update_Product_Category(
  In_Id int,
	In_Name varchar(15)
)
language plpgsql
as $$
begin

  UPDATE Product_Category set
      Name = In_Name
  WHERE In_Id = Id;
  
end; $$;

-- Delete an product_category
create or replace procedure Delete_Product_Category(In_Id int)
language plpgsql
as $$
begin

    Delete from product_category
    where Id = In_Id;
    
end; $$