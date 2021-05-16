CREATE TRIGGER add_discount ON [Order Details]
FOR INSERT
AS
IF (SELECT COUNT(DISTINCT I.ProductID) FROM inserted I) > 5
    UPDATE [Order Details]
    SET [Order Details].Discount = 0.15
    WHERE [Order Details].OrderID = (SELECT I.OrderID
                                     FROM inserted I
                                     GROUP BY I.OrderID);