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



