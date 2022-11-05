CREATE TYPE Full_Manager as(
    Id int,
    Username varchar(15),
    Name varchar(15),
    LastName1 varchar(15),
    LastName2 varchar(15),
    Email varchar(40),
    Province char(15),
    City varchar(15),
    District varchar(15),
    ManagesStore varchar(15)
);

--- get all stores
CREATE OR REPLACE FUNCTION Get_All_Managers()
returns setof Full_Manager
LANGUAGE sql
AS $$
  select 
    M.Id,
    M.Username, 
    M.Name, 
    M.LastName1,
    M.LastName2,
    M.Email, 
    M.Province, 
    M.City, 
    M.District, 
    S.Name as ManagesStore
  from Manager as M Join Store as S on M.Id = S.ManagerId;
$$;


--get product by barCode
create or replace function Get_Manager(in_id int)
returns setof Full_Manager
LANGUAGE sql
AS $$
  select 
    M.Id,
    M.Username, 
    M.Name, 
    M.LastName1,
    M.LastName2,
    M.Email, 
    M.Province, 
    M.City, 
    M.District, 
    S.Name as ManagesStore
  from Manager as M Join Store as S on M.Id = S.ManagerId
  where managerId = in_id;
$$;
