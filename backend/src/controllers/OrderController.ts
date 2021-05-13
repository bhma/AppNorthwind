import { IOrderDetail } from './../model/OrderDetail.model';
import { IOrder } from './../model/Order.model';
import { Request, Response } from 'express';
import { OrderService } from '../services/OrderService';
import { IProduct } from './../model/Product.model';

class OrderController {

    async getOrders(req: Request, res: Response) {
        try {
            const orderService = new OrderService();
            const resultOrder = await orderService.getOrders();
            res.json(resultOrder);
        } catch (error) {
            console.warn('Erro no Orders Controller: get Orders');
            console.error(error);
            res.json(error);
        }
    }

    async getOrderById(req: Request, res: Response) {
        try {
            const OrderID = parseInt(req.query.OrderID.toString());
            const orderService = new OrderService();
            const orderList = await orderService.getOrderById(OrderID);
            const orderFinded = orderList.find(order => order.OrderID === OrderID);
            res.json(orderFinded);
        } catch (error) {
            console.warn('Erro no Order Controller: get Order by id');
            console.error(error);
            res.json(error);
        }

    }
    
    async create(req: Request, res: Response) {
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
            productList
        } = req.body;
        const newOrder: IOrder = {
            CustomerID,
            OrderDate,
            ShippedDate,
            Freight,
            ShipAddress,
            ShipCity,
            ShipRegion,
            ShipPostalCode,
            ShipCountry
        };
        const products: IOrderDetail[] = productList
        try {
            const orderService = new OrderService();
            const result = await orderService.create(newOrder, products);
            res.json({ rowsAffected: result });
        } catch (error) {
            console.warn('Erro no Orders Controller: create');
            console.error(error);
            res.json(error);
        }
    }

}

export { OrderController };