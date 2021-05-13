import { IOrderDetail } from './../model/OrderDetail.model';
import { TYPES } from 'mssql';
import { db } from '../database';
import { IProduct } from '../model/Product.model';

class ProductService{

    async getProducts(){
        try {
            const result = await db.query<IProduct>('SELECT * FROM Products;');
            return result.recordset;
        } catch (error) {
            console.warn('Erro no customer service: getCustomer');
            console.error(error);
        }
    }

    async getProductById(productId: number){
        try {
            const tra = db.transaction();
            const transBegin = await tra.begin();
            const requestBd = transBegin.request();
            requestBd.input('productID', TYPES.Int, productId);
            const result = await requestBd.query<IProduct>('SELECT * FROM Products WHERE ProductID = @productID;');
            await transBegin.commit();
            return result.recordset;
        } catch (error) {
            console.warn('Erro no product service: getproduct by ID');
            console.error(error);
        }
    }

    async getProductsByOrderId(orderID: number){
        try {
            const tra = db.transaction();
            const transBegin = await tra.begin();
            const requestBd = transBegin.request();
            requestBd.input('orderID', TYPES.Int, orderID);
            const result = await requestBd.execute<IOrderDetail>('get_products_by_order');
            await transBegin.commit();
            return result.recordset;
        } catch (error) {
            console.warn('Erro no product service: getproduct by ID');
            console.error(error);
        }
    }
}

export { ProductService };