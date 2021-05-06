export interface IOrder{
    OrderID?: number;
    customerID: string;
    EmployeeID?: number;
    orderDate: Date;
    requireDate?: Date;
    shippedDate: Date;
    shipVia?: number;
    freight: number;
    shipName?: string;
    shipAddress: string;
    shipCity: string;
    shipRegion: string;
    shipPostalCode: string;
    shipCountry: string;
}