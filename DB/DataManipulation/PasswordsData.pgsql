create or replace function Get_Admin_Password(In_Id int)
returns text
LANGUAGE sql
AS $$
  select A.Password
  from administrator as A
  where A.id = In_Id;
$$;

create or replace function Get_Client_Password(In_Id int)
returns text
LANGUAGE sql
AS $$
  select C.Password
  from client as C
  where C.id = In_Id;
$$;


create or replace function Get_Manager_Password(In_Id int)
returns text
LANGUAGE sql
AS $$
  select m.Password
  from manager as m
  where m.id = In_Id;
$$;

