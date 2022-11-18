-- Insert Order_Products
create or replace procedure Insert_Order_Products(In_OrderId int, In_ProductsId int array)
language plpgsql
as $$
begin
    for i in 1..array_length(In_ProductsId, 1) loop
        INSERT INTO Order_Products(OrderId, ProductBarCode, Quantity) VALUES (In_OrderId , In_ProductsId[i], 1);
    end loop;
end; $$;

create or replace procedure Delete_Order_Products(In_OrderId int)
language plpgsql
as $$
begin
    DELETE FROM Order_Products WHERE OrderId = In_OrderId;
end; $$;