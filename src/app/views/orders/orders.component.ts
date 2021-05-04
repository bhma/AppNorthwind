import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

    FLAG: string = 'newOrder';
    constructor() { }

    ngOnInit(): void {
    }

}
