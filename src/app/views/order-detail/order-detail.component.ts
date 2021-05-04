import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
    orderId: string;
    constructor(
        private actRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.actRoute.params.subscribe((param) => {
            this.orderId = param.id;
        });
    }

}
