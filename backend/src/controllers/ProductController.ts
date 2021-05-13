import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';

class ProductController {

    async getProduts(req: Request, res: Response) {
        try {
            const productService = new ProductService();
            const productList = await productService.getProducts();
            res.json(productList);
        } catch (error) {
            console.warn('Erro no Product Controller: get Products');
            console.error(error);
            res.json(error);
        }
    }

    async getProductById(req: Request, res: Response){
        try {
            const ProductID = parseInt(req.query.OrderID.toString());
            const productService = new ProductService();
            const productList = await productService.getProductById(ProductID);
            const productFinded = productList.find(order => order.ProductID === ProductID);
            res.json(productFinded);
        } catch (error) {
            console.warn('Erro no Product Controller: get Product by id');
            console.error(error);
            res.json(error);
        }
    }

    async getProductsByOrderId(req: Request, res: Response) {
        try {
            const OrderID = parseInt(req.query.OrderID.toString());
            const productService = new ProductService();
            const productList = await productService.getProductsByOrderId(OrderID);
            res.json(productList);
        } catch (error) {
            console.warn('Erro no Order Controller: get Order by id');
            console.error(error);
            res.json(error);
        }

    }
}

export { ProductController };