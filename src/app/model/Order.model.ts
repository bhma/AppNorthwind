export interface IOrder{
    OrderID?: number;
    CustomerID: string;
    EmployeeID?: number;
    OrderDate: Date;
    RequireDate?: Date;
    ShippedDate: Date;
    ShipVia?: number;
    Freight: number;
    ShipName?: string;
    ShipAddress: string;
    ShipCity: string;
    ShipRegion: string;
    ShipPostalCode: string;
    ShipCountry: string;
}