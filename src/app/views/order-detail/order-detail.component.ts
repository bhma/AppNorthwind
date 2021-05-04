import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../products/Product.model';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
    formOrder: FormGroup;
    productList: Product[];
    orderId: string;

    constructor(
        private actRoute: ActivatedRoute,
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.actRoute.params.subscribe((param) => {
            this.orderId = param.id;
        });

        this.formOrder = this.fb.group({
            clientId: [null],
            orderDate: [null],
            shipDate: [null],
            freight: [null],
            shipAddress: [null],
            shipCity: [null],
            shipRegion: [null],
            shipPostalCode: [null],
            shipCountry: [null],
        });
    }

    onSubmit(){
        
    }

}
