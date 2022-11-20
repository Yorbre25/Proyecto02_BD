-- PROCEDURES FOR administrator MANIPULATION


--- get all administrators
CREATE OR REPLACE FUNCTION Get_All_Administrators()
returns setof Full_Administrator
LANGUAGE sql
AS $$
  select 
    A.Id,
    A.Name,
    A.LastName1,
    A.LastName2,
    A.Email,
    A.Province,
    A.City,
    A.District,
    A.Username,
    Array(
      Select AP.PhoneNumber
      from Administrator_Phones as AP
      where AP.AdministratorId = A.Id
    ) as PhoneNumbers
  from administrator as A;
$$;

--get an administrator by id
create or replace function Get_Administrator(In_Id int)
returns setof Full_Administrator
LANGUAGE sql
AS $$
  select 
    A.Id,
    A.Name,
    A.LastName1,
    A.LastName2,
    A.Email,
    A.Province,
    A.City,
    A.District,
    A.Username,
    Array(
      Select AP.PhoneNumber
      from Administrator_Phones as AP
      where AP.AdministratorId = A.Id
    ) as PhoneNumbers
  from administrator as A
  where A.Id = In_Id;
$$;


-- Insert new administrator
create or replace procedure Insert_Administrator(
  In_Id int,
	In_Name varchar(15),
	In_LastName1 varchar(15),
	In_LastName2 varchar(15),
	In_Email varchar(40),
	In_Province char(15),
	In_City varchar(15),
	In_District varchar(15),
  In_Username varchar(15),
  In_Password text,
  In_PhoneNumbers varchar array
)
language plpgsql
as $$
begin
  INSERT INTO Administrator(	
      Id,
      Name,
      LastName1,
      LastName2,
      Email,
      Province,
      City,
      District,
      Username, 
      Password
  ) 
  VALUES(
      In_Id,
      In_Name,
      In_LastName1,
      In_LastName2,
      In_Email,
      In_Province,
      In_City,
      In_District,
      In_Username,
      In_Password);
  call insert_administrator_phones(In_Id, In_PhoneNumbers);
end; $$;

-- Update an administrator
create or replace procedure Update_Administrator(
  In_Old_Id int,
  In_Id int,
	In_Name varchar(15),
	In_LastName1 varchar(15),
	In_LastName2 varchar(15),
	In_Email varchar(40),
	In_Province char(15),
	In_City varchar(15),
	In_District varchar(15),
  In_Username varchar(15),
  In_Password text,
  In_PhoneNumbers varchar(10) array
)
language plpgsql
as $$
begin

  call update_administrator_phones(In_Old_Id, In_Phonenumbers);
  Update Administrator
  set 
      Id = In_Id,
      Name = In_Name,
      LastName1 = In_LastName1,
      LastName2 = In_LastName2,
      Email = In_Email,
      Province = In_Province,
      City = In_City,
      District = In_District,
      Username = In_Username,
      Password = In_Password
  where Id = In_Old_Id;

end; $$;

-- Delete an administrator
create or replace procedure Delete_Administrator(In_Id int)
language plpgsql
as $$
begin
  call delete_administrator_phones(In_Id);
  DELETE from Administrator
  where Id = In_Id;
end; $$