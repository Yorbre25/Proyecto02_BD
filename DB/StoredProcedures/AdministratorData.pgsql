-- PROCEDURES FOR administrator MANIPULATION


--- get all administrators
CREATE OR REPLACE FUNCTION Get_All_Administrators()
returns setof administrator
LANGUAGE sql
AS $$
  select *
  from administrator;
$$;


--get an administrator by id
create or replace function Get_Administrator(In_Id int)
returns setof administrator
LANGUAGE sql
AS $$
  select *
  from administrator
  where id = In_Id;
$$;


-- Insert a new administrator
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
   	In_Password text
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
        crypt(In_Password, gen_salt('bf')));
end; $$
