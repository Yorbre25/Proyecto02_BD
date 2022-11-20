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
    PhoneNumbers character varying[]
);

--- get all managers
CREATE OR REPLACE FUNCTION Get_All_Managers()
returns setof Manager
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
    ARRAY(
      select MP.Phonenumber
      from Manager_Phones as MP
      where M.Id = MP.ManagerId
    ) as PhoneNumbers
  from Manager as M;
$$;


--get manager by id
create or replace function Get_Manager(in_id int)
returns setof Manager
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
    ARRAY(
      select MP.Phonenumber
      from Manager_Phones as MP
      where M.Id = MP.ManagerId
    ) as PhoneNumbers
  from Manager as M
  where M.Id = in_id;
$$;

--Isert Manager
create or replace procedure Insert_Manager(
  In_Id int,
  In_Username varchar(15),
  In_Name varchar(15),
  In_LastName1 varchar(15),
  In_LastName2 varchar(15),
  In_Email varchar(40),
  In_Province varchar(15),
  In_City varchar(15),
  In_District varchar(15),
  In_Password text,
  In_PhoneNumbers varchar(10) array
)
LANGUAGE plpgsql
AS $$
begin
  Insert into Manager(
    Id,
    Username,
    Name,
    LastName1,
    LastName2,
    Email,
    Province,
    City,
    District,
    Password
  )values(
    In_Id,
    In_Username,
    In_Name,
    In_LastName1,
    In_LastName2,
    In_Email,
    In_Province,
    In_City,
    In_District,
    In_Password
  );
  call insert_manager_phones(In_Id, In_PhoneNumbers);
end; $$;



--Update Manager
create or replace procedure Update_Manager(
  In_Old_Id int,
  In_Id int,
  In_Username varchar(15),
  In_Name varchar(15),
  In_LastName1 varchar(15),
  In_LastName2 varchar(15),
  In_Email varchar(40),
  In_Province varchar(15),
  In_City varchar(15),
  In_District varchar(15),
  In_Password text,
  In_PhoneNumbers varchar(10) array
)
LANGUAGE plpgsql
AS $$
begin

  call update_manager_phones(In_Old_Id, In_PhoneNumbers);

  Update Manager
  set
    Id = In_Id,
    Username = In_Username,
    Name = In_Name,
    LastName1 = In_LastName1,
    LastName2 = In_LastName2,
    Email = In_Email,
    Province = In_Province,
    City = In_City,
    District = In_District,
    Password = In_Password
  where Id = In_Old_id;
  
end; $$;

--Delete Manager
create or replace procedure Delete_Manager(In_Id int)
language plpgsql
as $$
begin

    call delete_manager_phones(In_Id);
    DELETE from Manager
    where Id = In_Id;

end; $$
