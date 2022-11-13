--DELIVERYMAM PHONES
--Insert deliveryman phones
create or replace procedure Insert_Deliveryman_Phones(In_Id int, In_PhoneNumbers varchar(10) array)
language plpgsql
as $$
begin
    for i in 1..array_length(In_PhoneNumbers, 1) loop
        INSERT INTO Deliveryman_Phones(DelManId,PhoneNumber) VALUES (In_Id,In_PhoneNumbers[i]);
    end loop;
end; $$;

--Delete deliveryman phones
create or replace procedure Delete_Deliveryman_Phones(In_Id int)
language plpgsql
as $$
begin
    delete from deliveryman_phones
    where delmanid = In_Id;
end; $$;

--Update deliveryman phones
create or replace procedure Update_Deliveryman_Phones(In_Id int, In_PhoneNumbers varchar(10) array)
language plpgsql
as $$
begin
    call delete_deliveryman_phones(In_Id);
    call insert_deliveryman_phones(In_Id,In_PhoneNumbers);
end; $$;


--MANAGER PHONES
---Create Manager phones
create or replace procedure Insert_Manager_Phones(In_Id int, In_PhoneNumbers varchar(10) array)
language plpgsql
as $$
begin
    for i in 1..array_length(In_PhoneNumbers, 1) loop
        INSERT INTO Manager_Phones(ManagerId,PhoneNumber) VALUES (In_Id,In_PhoneNumbers[i]);
    end loop;
end; $$;

--Delete Manager phones
create or replace procedure Delete_Manager_Phones(In_Id int)
language plpgsql
as $$
begin
    delete from Manager_phones
    where ManagerId = In_Id;
end; $$;

--Update Manager phones
create or replace procedure Update_Manager_Phones(In_Id int, In_PhoneNumbers varchar(10) array)
language plpgsql
as $$
begin
    call delete_Manager_phones(In_Id);
    call insert_Manager_phones(In_Id,In_PhoneNumbers);
end; $$;


--STORE PHONES
---Create Store Phones
create or replace procedure Insert_Store_Phones(In_Id int, In_PhoneNumbers varchar(10) array)
language plpgsql
as $$
begin
    for i in 1..array_length(In_PhoneNumbers, 1) loop
        INSERT INTO Store_Phones(StoreId,PhoneNumber) VALUES (In_Id,In_PhoneNumbers[i]);
    end loop;
end; $$;

--Delete Store phones
create or replace procedure Delete_Store_Phones(In_Id int)
language plpgsql
as $$
begin
    delete from Store_phones
    where StoreId = In_Id;
end; $$;

--Update Store phones
create or replace procedure Update_Store_Phones(In_Id int, In_PhoneNumbers varchar(10) array)
language plpgsql
as $$
begin
    call delete_Store_phones(In_Id);
    call insert_Store_phones(In_Id,In_PhoneNumbers);
end; $$;



