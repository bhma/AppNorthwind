import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { IProduct } from './../../../../backend/src/model/Product.model';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { listProducts, Product } from './Product.model';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

    readonly ITENS_PER_PAGE: number = 10;
    readonly MAX_SIZE: number = 5;
    readonly DIRECTION_LINKS: boolean = true;
    readonly BOUNDARY_LINKS: boolean = true;
    TOTAL_ITEMS: number;

    products: IProduct[];
    listPage: IProduct[];

    constructor(
        private pService: ProductService
    ) { }

    ngOnInit(): void {
        this.pService.getProducts()
        .subscribe(data => {
            this.products = data;
            this.TOTAL_ITEMS = this.products.length;
            this.listPage = this.products.slice(0, this.ITENS_PER_PAGE);
        });
    }

    pageChanged(event: PageChangedEvent) {
        const startItem = (event.page - 1) * event.itemsPerPage;
        const endItem = event.page * event.itemsPerPage;
        this.listPage = this.products.slice(startItem, endItem);
    }

}
