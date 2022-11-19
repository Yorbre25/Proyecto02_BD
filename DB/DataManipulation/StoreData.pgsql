CREATE TYPE Full_Store as(
    Id int,
    Name varchar(15),
    Email varchar(40),
    Province char(15),
    City varchar(15),
    District varchar(15),
    ManagerId int,
    StoreTypeId int,
    StoreTypeName varchar(15),
    PhoneNumbers character varying[]
);

--- get all stores
CREATE OR REPLACE FUNCTION Get_All_Stores()
returns setof Full_Store
LANGUAGE sql
AS $$
  select 
    S.Id, 
    S.Name, 
    S.Email, 
    S.Province, 
    S.City, 
    S.District, 
    M.Id as ManagerId,
    ST.Id as StoreTypeId,
    ST.Name as StoreTypeName,
    ARRAY(
      select SP.Phonenumber
      from Store_Phones as SP
      where S.Id = SP.StoreId
    ) as PhoneNumbers
  from (((Store as S join Store_Type as ST on S.StoreTypeId = ST.Id) 
  join Store_Phones as SP on S.Id = SP.StoreId)
  join Manager as M on S.ManagerId = M.Id)
  GROUP By S.id, M.Id, ST.Id, ST.Name
$$;


--get Store by Id
create or replace function Get_Store(in_id int)
returns setof Full_Store
LANGUAGE sql
AS $$
  select 
    S.Id, 
    S.Name, 
    S.Email, 
    S.Province, 
    S.City, 
    S.District, 
    M.Id as ManagerId,
    ST.Id as StoreTypeId,
    ST.Name as StoreTypeName,
    ARRAY(
      select SP.Phonenumber
      from Store_Phones as SP
      where S.Id = SP.StoreId
    ) as PhoneNumbers
  from (((Store as S join Store_Type as ST on S.StoreTypeId = ST.Id) 
  join Store_Phones as SP on S.Id = SP.StoreId)
  join Manager as M on S.ManagerId = M.Id)
  where S.Id = in_id
  GROUP By S.id, M.Id, ST.Id, ST.Name
$$;


-- Insert Store
create or replace procedure Insert_Store(
  In_Id int,
	In_Name varchar(15),
	In_Email varchar(40),
	In_Province char(15),
	In_City varchar(15),
	In_District varchar(15),
  In_StoreTypeId int,
  In_ManagerId int,
  In_PhoneNumbers varchar(10) array
)
language plpgsql
as $$
begin
  INSERT INTO Store(	
    Id,
    Name,
    Email,
    Province,
    City,
    District,
    StoreTypeId,
    ManagerId
  ) VALUES(
    In_Id,
    In_Name,
    In_Email,
    In_Province,
    In_City,
    In_District,
    In_StoreTypeId,
    In_ManagerId
  );
  CALL insert_store_phones(In_Id, In_PhoneNumbers);
end; $$;


-- Update Store
create or replace procedure Update_Store(
  In_Old_Id int,
  In_Id int,
	In_Name varchar(15),
	In_Email varchar(40),
	In_Province char(15),
	In_City varchar(15),
	In_District varchar(15),
  In_StoreTypeId int,
  In_ManagerId int,
  In_PhoneNumbers varchar(10) array
)
language plpgsql
as $$
begin

  call Update_Store_phones(In_Old_Id, In_PhoneNumbers);
  Update Store
  set 
    Id = In_Id,
    Name = In_Name,
    Email = In_Email,
    Province = In_Province,
    City = In_City,
    District = In_District,
    StoreTypeId = In_StoreTypeId,
    ManagerId = In_ManagerId
  where Id = In_Old_Id;
    
end; $$;



--Delete store
create or replace procedure Delete_Store(In_Id int)
language plpgsql
as $$
begin

    call delete_Store_phones(In_Id);
    DELETE from Store
    where Id = In_Id;

end; $$