create or replace view Full_Order AS
    Select 
        O.id,
        O.Total,
        O.Province,
        O.City,
        O.District,
        C.Name as ClientName,
        C.LastName1 as ClientLastName,
        D.Name as DelmanName,
        D.LastName1 as DelmanLastName,
        Array(
            Select P.Name 
            from Order_Products as OP join Product as P on OP.ProductBarCode = P.BarCode
            where OP.OrderId = O.Id
            ) as Products
    from ((((_Order as O join Client as C on O.ClientId = C.id) 
    join Deliveryman as D on O.DelManId = D.id)
    join order_products as OP on O.Id = OP.OrderId)
    join Product as P on OP.ProductBarCode = P.barCode)
    group by O.id, C.Name, C.LastName1, D.Name, D.lastname1;


create or replace view Full_Deliveryman AS
    Select 
        D.Id,
        D.username,
        D.Name,
        D.LastName1,
        D.LastName2,
        D.Email,
        D.Province,
        D.City,
        D.District,
        ARRAY(
            select DP.Phonenumber
            from Deliveryman_Phones as DP
            where D.id = DP.DelManId
        ) as phoneNumbers
        from Deliveryman as D;

create or replace view Full_Product AS
    Select 
        P.BarCode,
        P.Name,
        P.Price,
        PC.Name as Category
        from Product as P 
        join Product_Category as PC on P.CategoryId = PC.Id;

create or replace view Full_Store AS
    Select   
        S.Id, 
        S.Name, 
        S.Email, 
        S.Province, 
        S.City, 
        S.District, 
        M.Id as ManagerId,
        ST.Id as StoreTypeId,
        ST.Name as StoreTypeName,
        ApS.Status as ApplicationStatus,
        ARRAY(
            select SP.Phonenumber
            from Store_Phones as SP
            where S.id = SP.StoreId
        ) as phoneNumbers
    from ((((Store as S left join Store_Type as ST on S.StoreTypeId = ST.Id) 
    left join Store_Phones as SP on S.Id = SP.StoreId)
    left join Manager as M on S.ManagerId = M.Id)
    left join Applicant_Store as ApS on S.Id = ApS.StoreId)
    GROUP By S.id, M.Id, ST.Id, ST.Name, ApS.Status;

create or replace view Full_Manager as
  Select 
    M.Id,
    M.Username, 
    M.Name, 
    M.LastName1,
    M.LastName2,
    M.Email, 
    M.Province, 
    M.City, 
    M.District,
    ARRAY(
      select MP.Phonenumber
      from Manager_Phones as MP
      where M.Id = MP.ManagerId
    ) as PhoneNumbers
  from Manager as M;