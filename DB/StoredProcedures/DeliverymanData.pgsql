CREATE TYPE Full_Deliveryman as(
    Id int,
    Username varchar(15),
    Name varchar(15),
    LastName1 varchar(15),
    LastName2 varchar(15),
	  Email varchar(40),
    Province char(15),
    City varchar(15),
    District varchar(15),
    Password text,
    PhoneNumbers text
);

--- get all deliverymen
CREATE OR REPLACE FUNCTION Get_All_Deliverymen()
returns setof Full_Deliveryman
LANGUAGE sql
AS $$
  select D.*, string_agg(distinct phonenumber, ',') as PhoneNumbers
  from deliveryman as D join deliveryman_phones as DP on D.id = DP.delManId
  GROUP By D.id
$$;


--get deliveryman by id
create or replace function Get_Deliveryman(In_Id int)
returns setof Full_Deliveryman
LANGUAGE sql
AS $$
  select D.*, string_agg(distinct phonenumber, ',') as PhoneNumbers
  from deliveryman as D join deliveryman_phones as DP on D.id = DP.delManId
  WHERE D.id = In_Id
  GROUP BY D.id
$$;

-- Insert a new deliveyman
create or replace procedure Insert_Deliveryman(
  In_Id int,
  In_Username varchar(15),
	In_Name varchar(15),
	In_LastName1 varchar(15),
	In_LastName2 varchar(15),
  In_Email varchar(40),
	In_Province char(15),
	In_City varchar(15),
	In_District varchar(15),
  In_Password varchar(15),
  In_PhonesNumbers Deliveryman_Phones
)
language plpgsql
as $$
begin
    INSERT INTO Deliveryman(	
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
    ) 
    VALUES(
        In_Id,
        In_Username,
        In_Name,
        In_LastName1,
        In_LastName2,
        In_Email,
        In_Province,
        In_City,
        In_District,
        crypt(In_Password, gen_salt('bf')));
end; $$;

-- Update a derliveryman
create or replace procedure Update_Client(
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
        Password = crypt(In_Password, gen_salt('bf'))
    where Id = In_Id;
end; $$;

-- Delete a deliveryman
create or replace procedure Delete_Client(In_Id int)
language plpgsql
as $$
begin
    DELETE from Client
    where Id = In_Id;
end; $$