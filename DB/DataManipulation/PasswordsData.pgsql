create or replace function Get_Admin_Password(In_Username text)
returns text
LANGUAGE sql
AS $$
  select A.Password
  from administrator as A
  where A.Username = In_Username;
$$;

create or replace function Get_Client_Password(In_Username text)
returns client_login
LANGUAGE sql
AS $$
  select C.Password, C.Id
  from client as C
  where C.Username = In_Username;
$$;


create or replace function Get_Manager_Password(In_Username text)
returns setof manager_login
LANGUAGE sql
AS $$
  select 
    s.id as id,
    m.Password as password,
    aps.status as status,
    aps.observation as observation
  from manager as m, store as s, applicant_store as aps
  where 
  	m.Username = In_Username and
    s.managerid = m.id and
    s.id = aps.storeid;
$$;