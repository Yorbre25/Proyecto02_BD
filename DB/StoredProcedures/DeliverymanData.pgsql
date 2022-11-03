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