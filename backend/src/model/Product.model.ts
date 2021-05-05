export interface IProduct{
    productID: number;
    productName: string;
    supplierId: number;
    categoryId: number;
    qtdPerUnit: string;
    unitPrice: string;
    unitsInStock: number;
    unitsOnOrder: number;
    reOrderLevel: number;
    discontinued: boolean;
}