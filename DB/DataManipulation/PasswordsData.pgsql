create or replace function Get_Admin_Password(In_Username text)
returns text
LANGUAGE sql
AS $$
  select A.Password
  from administrator as A
  where A.Username = In_Username;
$$;

create or replace function Get_Client_Password(In_Username text)
returns text
LANGUAGE sql
AS $$
  select C.Password
  from client as C
  where C.Username = In_Username;
$$;


create or replace function Get_Manager_Password(In_Username text)
returns text
LANGUAGE sql
AS $$
  select m.Password
  from manager as m
  where m.Username = In_Username;
$$;

