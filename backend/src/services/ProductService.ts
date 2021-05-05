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
}

export { ProductService };