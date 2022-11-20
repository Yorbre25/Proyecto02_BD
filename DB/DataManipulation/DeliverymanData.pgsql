

--- get all deliverymen
CREATE OR REPLACE FUNCTION Get_All_Deliverymen()
returns setof Full_Deliveryman
LANGUAGE sql
AS $$
  select * from Full_Deliveryman;
$$;


--get deliveryman by id
create or replace function Get_Deliveryman(In_Id int)
returns setof Full_Deliveryman
LANGUAGE sql
AS $$
  select * from Full_Deliveryman where id = In_Id;
$$;


-- Insert deliveyman
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
  In_PhoneNumbers varchar(10) array
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
  )VALUES(
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
  CALL insert_deliveryman_phones(In_Id, In_PhoneNumbers);
end; $$;


-- Update derliveryman
create or replace procedure Update_Deliveryman(
  In_Old_Id int,
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
  In_PhoneNumbers varchar(10) array
)
language plpgsql
as $$
begin

  call Update_deliveryman_phones(In_Old_Id, In_PhoneNumbers);
  Update deliveryman
  set 
    Id = In_Id,
    Name = In_Name,
    LastName1 = In_LastName1,
    LastName2 = In_LastName2,
    Province = In_Province, 
    City = In_City,
    District = In_District,
    Email = In_Email,
    Username = In_Username,
    Password = In_Password
  where Id = In_Old_Id;
    
end; $$;


-- Delete a deliveryman
create or replace procedure Delete_Deliveryman(In_Id int)
language plpgsql
as $$
begin

    call delete_deliveryman_phones(In_Id);
    DELETE from Deliveryman
    where Id = In_Id;

end; $$