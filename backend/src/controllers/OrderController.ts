import { IOrder } from './../model/Order.model';
import { Request, Response } from 'express';
import { ICustomer } from '../model/Customer.model';
import { OrderService } from '../services/OrderService';
import { IProduct } from './../model/Product.model';

class OrderController {

    async getOrders(req: Request, res: Response) {
        try {
            const orderService = new OrderService();
            const resultOrder = await orderService.getOrders();
            res.json(resultOrder);
        } catch (error) {
            console.warn('Erro no Customers Controller: get Customers');
            console.error(error);
        }
    }

    async create(req: Request, res: Response) {
        const {
            customerID,
            orderDate,
            shippedDate,
            freight,
            shipAddress,
            shipCity,
            shipRegion,
            shipPostalCode,
            shipCountry,
            productList
        } = req.body;
        const newOrder: IOrder = {
            customerID,
            orderDate,
            shippedDate,
            freight,
            shipAddress,
            shipCity,
            shipRegion,
            shipPostalCode,
            shipCountry
        };
        const products: IProduct[] = productList
        try {
            const orderService = new OrderService();
            const result = await orderService.create(newOrder, products);
            res.json({ rowsAffected: result });
        } catch (error) {
            console.warn('Erro no Customers Controller: create');
            console.error(error);
        }
    }

}

export { OrderController };