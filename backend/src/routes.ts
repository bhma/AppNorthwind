import { Router } from 'express';
import { CustomerController } from './controllers/CustomerController';
import { OrderController } from './controllers/OrderController';
import { ProductController } from './controllers/ProductController';

const routes = Router();

// ---> aqui instanciar os controllers
const customerController = new CustomerController();
const productController = new ProductController();
const orderController = new OrderController()
// --->

// ---> Definição das rotas (get, post, put, delete)

// Rotas para Customers
routes.get('/customers', customerController.getCustomers);
routes.get('/customerbyid', customerController.getCustomerById);
routes.post('/newcustomer', customerController.create);
routes.put('/updatecustomer', customerController.update);
routes.delete('/delcustomer', customerController.delete);

// Rotas para Products
routes.get('/products', productController.getProduts);

//Rotas para Orders
routes.get('/orders', orderController.getOrders);
routes.post('/neworder', orderController.create);
// --->

export { routes };
