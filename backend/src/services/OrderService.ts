import { IProduct } from './../model/Product.model';
import { db, TYPES } from '../database';
import { IOrder } from './../model/Order.model';


class OrderService{

    async getOrders(){
        try {
            const result = await db.query<IOrder>('SELECT * FROM Orders;');
            return result.recordset;
        } catch (error) {
            console.warn('Erro no Orders service: getOrders');
            console.error(error);
        }
    }
    // order: IOrder, productList: IProduct[]
    async create(){
        // const {
        //     customerID,
        //     orderDate,
        //     shippedDate,
        //     freight,
        //     shipAddress,
        //     shipCity,
        //     shipRegion,
        //     shipPostalCode,
        //     shipCountry,
        // } = order;
        try {
            // Transação na tabela Orders
            const transactionOrder = db.transaction();
            const transOrderBegin = await transactionOrder.begin();
            const requestOrderBd = transOrderBegin.request();
            requestOrderBd.input('customerID', TYPES.NVarChar, 'ANVIE');
            requestOrderBd.input('orderDate', TYPES.Date, '2019-05-05');
            requestOrderBd.input('shippedDate', TYPES.Date, '2021-03-03');
            requestOrderBd.input('freight', TYPES.Int, 45);
            requestOrderBd.input('shipAddress', TYPES.NVarChar, 'Boulevard Tirou, 255');
            requestOrderBd.input('shipCity', TYPES.NVarChar, 'Charleroi');
            requestOrderBd.input('shipRegion', TYPES.NVarChar, null);
            requestOrderBd.input('shipPostalCode', TYPES.NVarChar, 'B-6000');
            requestOrderBd.input('shipCountry', TYPES.NVarChar, 'Belgium');
            const resultOrder = await requestOrderBd.query<IOrder>(`
                INSERT INTO Orders (CustomerID, OrderDate, ShippedDate, Freight, ShipAddress, ShipCity,
                                    ShipRegion, ShipPostalCode, ShipCountry)
                VALUES(@customerID, @orderDate, @shippedDate, @freight, @shipAddress, @shipCity, 
                       @shipRegion, @shipPostalCode, @shipCountry);
            `);
            await transOrderBegin.commit();
            
            // // Transação na tabela Orders_Detail
            // const transactionOrderDetail = db.transaction();
            // const transODBegin = await transactionOrderDetail.begin();
            // const requestODBd = transODBegin.request();
            // requestODBd.input('orderID', TYPES.NVarChar);
            // requestODBd.input('productID', TYPES.Int);
            // requestODBd.input('unitPrice', TYPES.Money);
            // requestODBd.input('qtd', TYPES.Int);
            // requestODBd.input('discount', TYPES.Real);
            
            // const resultOD = await requestODBd.query<IOrder>(`
            //     INSERT INTO Orders (CustomerID, OrderDate, ShippedDate, Freight, ShipAddress, ShipCity,
            //                         ShipRegion, ShipPostalCode, ShipCountry)
            //     VALUES(@customerID, @orderDate, @shippedDate, @freight, @shipAddress, @shipCity, 
            //            @shipRegion, @shipPostalCode, @shipCountry);
            // `);
            // await transODBegin.commit();
            // resultOrder.rowsAffected.concat(resultOD.rowsAffected);

            return resultOrder.recordset;
        } catch (error) {
            console.warn('Erro no customer service: create');
            console.error(error);
        }
    }

    // async update(customer: ICustomer){
    //     const {
    //         customerID,
    //         companyName,
    //         contactName,
    //         contactTitle,
    //         address,
    //         city,
    //         region,
    //         postalCode,
    //         country,
    //         phone,
    //         fax
    //     } = customer;
    //     try {
    //         const tra = db.transaction();
    //         const transBegin = await tra.begin();
    //         const requestBd = transBegin.request();
    //         requestBd.input('customerID', TYPES.NVarChar, customerID);
    //         requestBd.input('companyName', TYPES.NVarChar, companyName);
    //         requestBd.input('contactName', TYPES.NVarChar, contactName);
    //         requestBd.input('contactTitle', TYPES.NVarChar, contactTitle);
    //         requestBd.input('address', TYPES.NVarChar, address);
    //         requestBd.input('city', TYPES.NVarChar, city);
    //         requestBd.input('region', TYPES.NVarChar, region);
    //         requestBd.input('postalCode', TYPES.NVarChar, postalCode);
    //         requestBd.input('country', TYPES.NVarChar, country);
    //         requestBd.input('phone', TYPES.NVarChar, phone);
    //         requestBd.input('fax', TYPES.NVarChar, fax);
    //         const result = await requestBd.query<ICustomer>('UPDATE Customers SET CompanyName = @companyName, ContactName = @contactName, ContactTitle = @contactName, Address = @address, City = @city, Region = @region, PostalCode = @postalCode, Country = @country, Phone = @phone, Fax = @fax WHERE CustomerID = @customerID;');
    //         await transBegin.commit();
            
    //         return result.rowsAffected;
    //     } catch (error) {
    //         console.warn('Erro no customer service: update');
    //         console.error(error);
    //     }
    // }

    // async delete(customerId: string){
    //     try {
    //         const tra = db.transaction();
    //         const transBegin = await tra.begin();
    //         const requestBd = transBegin.request();
    //         requestBd.input('customerID', TYPES.NVarChar, customerId);
    //         const result = await requestBd.query<ICustomer>(`DELETE FROM Customers WHERE CustomerID = @customerID`);
    //         await transBegin.commit();
            
    //         return result.rowsAffected;
    //     } catch (error) {
    //         console.warn('Erro no customer service: delete');
    //         console.error(error);
    //     }
    // }

}

export { OrderService };