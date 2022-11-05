CREATE TYPE Full_Store as(
    Id int,
    Name varchar(15),
	Email varchar(40),
    Province char(15),
    City varchar(15),
    District varchar(15),
    ManagerName varchar(15),
    ManagerLastName1 varchar(15),
    ManagerLastName2 varchar(15),
    StoreType varchar(15),
    PhoneNumbers text
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
    M.Name as ManagerName, 
    M.LastName1 as ManagerLastName1, 
    M.LastName2 as ManagerLastName2, 
    ST.Name as StoreType, 
    array_to_string(array_agg(SP.PhoneNumber), ',') as PhoneNumbers
  from (((Store as S join Store_Type as ST on S.StoreTypeId = ST.Id) 
  join Store_Phones as SP on S.Id = SP.StoreId)
  join Manager as M on S.ManagerId = M.Id)
  GROUP By S.id, M.Name, M.lastname1, M.lastname2, ST.Name
$$;


--get product by barCode
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
    M.Name as ManagerName, 
    M.LastName1 as ManagerLastName1, 
    M.LastName2 as ManagerLastName2, 
    ST.Name as StoreType, 
    array_to_string(array_agg(SP.PhoneNumber), ',') as PhoneNumbers
  from (((Store as S join Store_Type as ST on S.StoreTypeId = ST.Id) 
  join Store_Phones as SP on S.Id = SP.StoreId)
  join Manager as M on S.ManagerId = M.Id)
  where S.Id = in_id
  GROUP By S.id, M.Name, M.lastname1, M.lastname2, ST.Name
$$;
