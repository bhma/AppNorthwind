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
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.actRoute.params.subscribe((param) => {
            this.productId = param.id;
        });

        this.formProduct = this.fb.group({
            productId: [null],
            productName: [null],
            suplierId: [null],
            categoryId: [null],
            qtdPerUnit: [null],
            unitPrice: [null],
            untilInStok: [null],
            onOrder: [null],
        });
    }

}
