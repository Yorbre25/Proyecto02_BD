--- get all clients
CREATE OR REPLACE FUNCTION Get_All_Clients()
returns setof client
LANGUAGE sql
AS $$
  select *
  from client;
$$;


-- get an client by id
create or replace function Get_Client(In_Id int)
returns setof client
LANGUAGE sql
AS $$
  select *
  from client
  where id = In_Id;
$$;



-- Insert new client
create or replace procedure Insert_Client(
  In_Id int,
	In_Name varchar(15),
	In_LastName1 varchar(15),
	In_LastName2 varchar(15),
	In_Province char(15),
	In_City varchar(15),
	In_District varchar(15),
  In_PhoneNumber varchar(10),
  In_Username varchar(15),
  In_BirthDate date,
  In_Password varchar(15)
)
language plpgsql
as $$
begin
    INSERT INTO Client(	
        Id,
        Name,
        LastName1,
        LastName2,
        Province,
        City,
        District,
        PhoneNumber,
        Username,
        BirthDate, 
        Password
    ) 
    VALUES(
        In_Id,
        In_Name,
        In_LastName1,
        In_LastName2,
        In_Province,
        In_City,
        In_District,
        In_PhoneNumber,
        In_Username,
        In_BirthDate,
        In_Password
    );
end; $$;

-- Update client
create or replace procedure Update_Client(
  In_Old_Id int,
  In_Id int,
	In_Name varchar(15),
	In_LastName1 varchar(15),
	In_LastName2 varchar(15),
	In_Province char(15),
	In_City varchar(15),
	In_District varchar(15),
  In_PhoneNumber varchar(10),
  In_Username varchar(15),
  In_BirthDate date,
  In_Password varchar(15)
)
language plpgsql
as $$
begin
    Update Client
    set 
        Id = In_Id,
        Name = In_Name,
        LastName1 = In_LastName1,
        LastName2 = In_LastName2,
        Province = In_Province, 
        City = In_City,
        District = In_District,
        PhoneNumber = In_PhoneNumber,
        Username = In_Username,
        BirthDate = In_BirthDate, 
        Password = In_Password
    where Id = In_Old_Id;
end; $$;

-- Delete a client
create or replace procedure Delete_Client(In_Id int)
language plpgsql
as $$
begin
    DELETE from Client
    where Id = In_Id;
end; $$