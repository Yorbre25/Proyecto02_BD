--get all store_types
CREATE OR REPLACE FUNCTION Get_All_Store_Types()
returns setof Store_Type
LANGUAGE sql
AS $$
  select *
  from Store_Type;
$$;


--get store_type by id
create or replace function Get_Store_Type(In_Id int)
returns setof Store_Type
LANGUAGE sql
AS $$
  select *
  from Store_Type
  where id = In_Id;
$$;

--Insert store_type
create or replace procedure Insert_Store_Type(In_Name varchar(15))
language plpgsql
as $$
begin

  INSERT INTO Store_Type(Name)
  VALUES(In_Name);
  
end; $$;

-- Update store_type
create or replace procedure Update_Store_Type(
  In_Id int,
	In_Name varchar(15)
)
language plpgsql
as $$
begin

  UPDATE Store_Type set
      Name = In_Name
  WHERE In_Id = Id;
  
end; $$;

-- Delete an store_type
create or replace procedure Delete_Store_Type(In_Id int)
language plpgsql
as $$
begin

    Delete from Store_Type
    where Id = In_Id;
    
end; $$