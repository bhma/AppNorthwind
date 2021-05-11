import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { listProducts, Product } from './Product.model';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    Products: Product[];
    pagAtual: number = 1;

    constructor() { }

    ngOnInit(): void {
        this.Products = listProducts;
    }

}
