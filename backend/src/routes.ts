import { Router } from 'express';
import { CustomerController } from './controllers/CustomerController';
import { OrderController } from './controllers/OrderController';
import { ProductController } from './controllers/ProductController';
import { errorHandler } from './controllers/ErroController';

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
routes.get('/productbyid', productController.getProductById);
routes.get('/productbyorder', productController.getProductsByOrderId);

//Rotas para Orders
routes.get('/orders', orderController.getOrders);
routes.get('/orderbyid', orderController.getOrderById);
routes.post('/neworder', orderController.create);
// --->

// ---> Tratamento de erros
routes.use(errorHandler);

// --->

export { routes };
