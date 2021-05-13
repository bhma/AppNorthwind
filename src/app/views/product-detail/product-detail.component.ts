import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
    formProduct: FormGroup;
    productId: number;

    constructor(
        private actRoute: ActivatedRoute,
        private fb: FormBuilder,
        private pService: ProductService
    ) { }

    ngOnInit(): void {
        this.formProduct = this.fb.group({
            ProductID: [null],
            ProductName: [null],
            SupplierID: [null],
            CategoryID: [null],
            QuantityPerUnit: [null],
            UnitPrice: [null],
            UnitsInStock: [null],
            UnitsOnOrder: [null],
            ReorderLevel: [null],
            Discontinued: [null],
        });

        this.actRoute.params.subscribe((param) => {
            this.productId = param.id;
        });

        this.pService.getProductById(this.productId)
            .subscribe(data => {
                this.formProduct.setValue(data);
            });
    }
}
