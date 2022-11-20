-- Si se inserta una tienda, crear la solicitud de afiliación

-- SI SE ACTUALIZA UNA TIENDA, SE DEBE APROBAR OTRA VEZ
--  LA SOLICITUD DE AFILIACIÓN

-- Sumar los propductos a la orden cuando se inserta una orden



-- HAY QUE CORRER ESTO DESPUES DE CREAR LA BASE 
-- PERO ANTES DE CREAR LOS DATOS

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
END;
$$;

Create or replace trigger Application_from_Store
    after insert on Store
    for each row
    execute function Insert_Applicant_Sotre_Function();