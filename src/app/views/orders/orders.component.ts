import { Observable } from 'rxjs';
import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../model/Order.model';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

    FLAG: string = 'newOrder';
    obsOrderList$: Observable<IOrder[]>;

    constructor(
        private oService: OrderService
    ) { }

    ngOnInit(): void {
        this.obsOrderList$ = this.oService.getOrders();
    }

}
