CREATE PROC report_categories
AS
SELECT P.CategoryID, C.CategoryName, COUNT(P.ProductID) qtd_Products FROM Orders O
JOIN [Order Details] OD ON OD.OrderID = O.OrderID
JOIN Products P ON P.ProductID = OD.ProductID
JOIN Categories C ON C.CategoryID = P.CategoryID
GROUP BY P.CategoryID, C.CategoryName
ORDER BY qtd_Products DESC