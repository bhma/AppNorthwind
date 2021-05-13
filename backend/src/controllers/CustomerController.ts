import { Request, Response, NextFunction } from 'express';
import { CustomerService } from '../services/CustomerService';
import { ICustomer } from '../model/Customer.model';

class CustomerController {

    async getCustomers(req: Request, res: Response) {
        try {
            const customerService = new CustomerService();
            const customerList = await customerService.getCustomers();
            res.json(customerList);
        } catch (error) {
            console.warn('Erro no Customers Controller: get Customers');
            console.error(error);
            res.json(error);
        }
    }

    async getCustomerById(req: Request, res: Response) {
        try {
            const CustomerID = req.query.CustomerID;
            const customerService = new CustomerService();
            const customerList = await customerService.getCustomerById(CustomerID.toString());
            const customerFinded = customerList.find(customer => customer.CustomerID === CustomerID);
            res.json(customerFinded);
        } catch (error) {
            console.warn('Erro no Customers Controller: get Customers');
            console.error(error);
            res.json(error);
        }
    }

    async create(req: Request, res: Response) {
        const {
            CustomerID,
            CompanyName,
            ContactName,
            ContactTitle,
            Address,
            City,
            Region,
            PostalCode,
            Country,
            Phone,
            Fax
        } = req.body;
        const newCustomer: ICustomer = {
            CustomerID,
            CompanyName,
            ContactName,
            ContactTitle,
            Address,
            City,
            Region,
            PostalCode,
            Country,
            Phone,
            Fax
        };
        try {
            const customerService = new CustomerService();
            const result = await customerService.create(newCustomer);
            res.json({ rowsAffected: result });
        } catch (error) {
            console.warn('Erro no Customers Controller: create');
            console.error(error);
            res.json(error);
        }
    }

    async update(req: Request, res: Response) {
        const {
            CustomerID,
            CompanyName,
            ContactName,
            ContactTitle,
            Address,
            City,
            Region,
            PostalCode,
            Country,
            Phone,
            Fax
        } = req.body;
        const updateCustomer: ICustomer = {
            CustomerID,
            CompanyName,
            ContactName,
            ContactTitle,
            Address,
            City,
            Region,
            PostalCode,
            Country,
            Phone,
            Fax
        };
        try {
            const customerService = new CustomerService();
            const result = await customerService.update(updateCustomer);
            res.json({ rowsAffected: result });
        } catch (error) {
            console.warn('Erro no Customers Controller: update');
            console.error(error);
            res.json(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const customerID = req.query.CustomerID;

        try {
            const customerService = new CustomerService();
            const rowsAffected = await customerService.delete(customerID.toString());
            res.json({rowsAffected});
        } catch (error) {
            console.warn('Erro no Customers Controller: delete');
            console.error(error);
            res.json(error);
        }
    }

}

export { CustomerController };