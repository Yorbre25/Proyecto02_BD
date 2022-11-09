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