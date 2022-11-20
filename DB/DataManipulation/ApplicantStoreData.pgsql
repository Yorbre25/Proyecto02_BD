create or replace function Get_All_Applicant_Stores()
returns setof Full_Store
LANGUAGE sql
AS $$
  select * from Full_Store
  where ApplicationStatus = false;
$$;

-- Set store aplication status to true
create or replace procedure Approve_Application(In_StoreId int)
language plpgsql
as $$
begin
    Update applicant_store
    set
        Status = true
    where
        StoreId = In_StoreId;

end; $$;

-- Delete store application
create or replace procedure Delete_Applicant_Store(In_StoreId int)
language plpgsql
as $$
begin
    Delete from applicant_store
    where StoreId = In_StoreId;
end; $$;
