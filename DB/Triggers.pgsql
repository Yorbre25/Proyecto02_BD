
-- HAY QUE CORRER ESTO DESPUES DE CREAR LA BASE 
-- PERO ANTES DE CREAR LOS DATOS


-- Sumar los propductos a la orden cuando se inserta una orden

-- create or replace procedure Order_Total_Function()
-- language plpgsql
-- as $$
-- declare id_var int;
-- begin
--     update _Order 
--         set Total = (
--             select sum(P.Price*OP.Quantity)
--             from Order_Products as OP 
--             join Product as P on OP.ProductBarCode = P.BarCode
--             where OP.OrderId = New.Id
--             group by OP.OrderId)
--         where Id = New.Id;
-- end; $$;

-- Create or replace trigger Order_Total
--     after insert on _Order
--     call procedure Order_Total_Function();



-- Update Store Appliaction status to false after updating
CREATE or replace FUNCTION Renew_Applicant_Store_Function()
   RETURNS TRIGGER 
   LANGUAGE PLPGSQL
AS $$
BEGIN
    Update applicant_store
    set
        Status = false
    where StoreId = New.Id;
    return new;
END; $$;

Create or replace trigger Renew_Applicant_Store
    after update on Store
    for each row
    execute function Renew_Applicant_Store_Function();


-- Inserts Stores into Applicant_Store when Store 
-- is inserted
CREATE or replace FUNCTION Insert_Applicant_Sotre_Function() 
   RETURNS TRIGGER 
   LANGUAGE PLPGSQL
AS $$
BEGIN
    Insert into Applicant_Store(StoreId)
    values(NEW.Id);
    RETURN NEW;
END; $$;

Create or replace trigger Application_from_Store
    after insert on Store
    for each row
    execute function Insert_Applicant_Sotre_Function();