import { IOrderDetail } from './../model/OrderDetail.model';
import { IProduct } from './../model/Product.model';
import { db, TYPES, PreparedStatement } from '../database';
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


    async getOrderById(orderID: number){
        try {
            const tra = db.transaction();
            const transBegin = await tra.begin();
            const requestBd = transBegin.request();
            requestBd.input('orderID', TYPES.Int, orderID);
            const result = await requestBd.query<IOrder>('SELECT * FROM Orders WHERE OrderID = @orderID;');
            await transBegin.commit();
            return result.recordset;
        } catch (error) {
            console.warn('Erro no order service: getOrder by ID');
            console.error(error);
        }
    }

    async create(order: IOrder, productList: IProduct[]){
        const {
            CustomerID,
            OrderDate,
            ShippedDate,
            Freight,
            ShipAddress,
            ShipCity,
            ShipRegion,
            ShipPostalCode,
            ShipCountry,
        } = order;
        try {
            // Transação na tabela Orders
            const transactionOrder = db.transaction();
            const transOrderBegin = await transactionOrder.begin();
            const requestOrderBd = transOrderBegin.request();
            requestOrderBd.input('customerID', TYPES.NVarChar, CustomerID);
            requestOrderBd.input('orderDate', TYPES.Date, OrderDate);
            requestOrderBd.input('shippedDate', TYPES.Date, ShippedDate);
            requestOrderBd.input('freight', TYPES.Real, Freight);
            requestOrderBd.input('shipAddress', TYPES.NVarChar, ShipAddress);
            requestOrderBd.input('shipCity', TYPES.NVarChar, ShipCity);
            requestOrderBd.input('shipRegion', TYPES.NVarChar, ShipRegion);
            requestOrderBd.input('shipPostalCode', TYPES.NVarChar, ShipPostalCode);
            requestOrderBd.input('shipCountry', TYPES.NVarChar, ShipCountry);
            const resultOrder = await requestOrderBd.query<IOrder>(`
                INSERT INTO Orders (CustomerID, OrderDate, ShippedDate, Freight, ShipAddress, ShipCity,
                                    ShipRegion, ShipPostalCode, ShipCountry)
                VALUES(@customerID, @orderDate, @shippedDate, @freight, @shipAddress, @shipCity, 
                       @shipRegion, @shipPostalCode, @shipCountry);
            `);
            await transOrderBegin.commit();
            const insertedOrderID = resultOrder.recordset[0].OrderID;
            
            // Cria uma prepared statement na tabela Orders_Detail
            const transactionOD = db.transaction();
            const transactionODBegin = await transactionOD.begin();
            const preparedStatementOD = new PreparedStatement(transactionODBegin);
            preparedStatementOD.input('orderID', TYPES.Int);
            preparedStatementOD.input('productID', TYPES.Int);
            preparedStatementOD.input('unitPrice', TYPES.Real);
            preparedStatementOD.input('qtd', TYPES.Int);
            preparedStatementOD.input('discount', TYPES.Real);
            await preparedStatementOD.prepare(`
                INSERT INTO [Order Details] (OrderID, ProductID, UnitPrice, Quantity, Discount)
                VALUES (@orderID, @productID, @unitPrice, @qtd, @discount);
            `);
            for (const product of productList) {
                const resultOD = await preparedStatementOD.execute<IOrderDetail>({
                    orderID: insertedOrderID,
                    productID: product.ProductID,
                    unitPrice: product.UnitPrice,
                    qtd: product.qtdOrdered,
                    discount: 0
                });
            }
            await preparedStatementOD.unprepare();
            await transactionODBegin.commit();
            
            return resultOrder.rowsAffected;
        } catch (error) {
            console.warn('Erro no order service: create');
            console.error(error);
        }
    }

}

export { OrderService };