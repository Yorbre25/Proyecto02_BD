--- get all clients
CREATE OR REPLACE FUNCTION Get_All_Clients()
returns setof client
LANGUAGE sql
AS $$
  select *
  from client;
$$;


--get an client by id
create or replace function Get_Client(In_Id int)
returns setof client
LANGUAGE sql
AS $$
  select *
  from client
  where id = In_Id;
$$;