import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
    productId: number;

    constructor(
        private actRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.actRoute.params.subscribe((param) => {
            this.productId = param.id;
        });
    }

}
