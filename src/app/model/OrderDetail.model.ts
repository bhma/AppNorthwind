export interface IOrderDetail {
    OrderID: number;
    ProductID: number
    ProductName?: string;
    Quantity: number;
    UnitPrice: number;
    Discount: number;
}