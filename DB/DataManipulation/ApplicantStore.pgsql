create or replace function Get_All_Applicant_Stores()
returns setof Full_Store
LANGUAGE sql
AS $$
  select 
    S.Id, 
    S.Name, 
    S.Email, 
    S.Province, 
    S.City, 
    S.District, 
    M.Id as ManagerId,
    ST.Id as StoreTypeId,
    ST.Name as StoreTypeName,
    ARRAY(
      select SP.Phonenumber
      from Store_Phones as SP
      where S.Id = SP.StoreId
    ) as PhoneNumbers
  from ((((Store as S left join Store_Type as ST on S.StoreTypeId = ST.Id) 
  left join Store_Phones as SP on S.Id = SP.StoreId)
  left join Manager as M on S.ManagerId = M.Id)
  left join Applicant_Store as ApS on S.Id = ApS.StoreId)
  where ApS.Status = false
  GROUP By S.id, M.Id, ST.Id, ST.Name
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
