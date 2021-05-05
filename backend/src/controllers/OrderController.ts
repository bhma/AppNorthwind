import { Request, Response } from 'express';
import { ICustomer } from '../model/Customer.model';
import { OrderService } from '../services/OrderService';
import { IProduct } from './../model/Product.model';

class OrderController {

    async getOrders(req: Request, res: Response) {
        try {
            const orderService = new OrderService();
            const resultOrder = await orderService.create();
            res.json(resultOrder);
        } catch (error) {
            console.warn('Erro no Customers Controller: get Customers');
            console.error(error);
        }
    }

    // async create(req: Request, res: Response) {
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
    //     } = req.body;
    //     const newCustomer: ICustomer = {
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
    //     };
    //     try {
    //         const customerService = new CustomerService();
    //         const result = await customerService.create(newCustomer);
    //         res.json({rowsAffected: result});
    //     } catch (error) {
    //         console.warn('Erro no Customers Controller: create');
    //         console.error(error);
    //     }
    // }

    // async update(req: Request, res: Response){
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
    //     } = req.body;
    //     const updateCustomer: ICustomer = {
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
    //     };
    //     try {
    //         const customerService = new CustomerService();
    //         const result = await customerService.update(updateCustomer);
    //         res.json({rowsAffected: result});
    //     } catch (error) {
    //         console.warn('Erro no Customers Controller: update');
    //         console.error(error);
    //     }
    // }

    // async delete(req: Request, res: Response){
    //     const {
    //         customerID
    //     } = req.body;
        
    //     try {
    //         const customerService = new CustomerService();
    //         const result = await customerService.delete(customerID);
    //         res.json({rowsAffected: result});
    //     } catch (error) {
    //         console.warn('Erro no Customers Controller: delete');
    //         console.error(error);
    //     }
    // }

}

export { OrderController };