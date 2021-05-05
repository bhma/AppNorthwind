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
        }
    }
}

export { ProductController };