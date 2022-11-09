--get all store_types
CREATE OR REPLACE FUNCTION Get_All_Store_Types()
returns setof Store_Type
LANGUAGE sql
AS $$
  select *
  from Store_Type;
$$;


--get an product_types by id
create or replace function Get_Store_Type(In_Id int)
returns setof Store_Type
LANGUAGE sql
AS $$
  select *
  from Store_Type
  where id = In_Id;
$$;