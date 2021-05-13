import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { IOrder } from '../../model/Order.model';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

    readonly ITENS_PER_PAGE: number = 10;
    readonly MAX_SIZE: number = 5;
    readonly DIRECTION_LINKS: boolean = true;
    readonly BOUNDARY_LINKS: boolean = true;
    TOTAL_ITEMS: number;
    FLAG: number = 0;
    orderList: IOrder[];
    listPage: IOrder[];

    constructor(
        private oService: OrderService
    ) { }

    ngOnInit(): void {
        this.oService.getOrders().subscribe(data => {
            this.orderList = data;
            this.TOTAL_ITEMS = this.orderList.length;
            this.listPage = this.orderList.slice(0, this.ITENS_PER_PAGE);
        });
    }

    pageChanged(event: PageChangedEvent) {
        const startItem = (event.page - 1) * event.itemsPerPage;
        const endItem = event.page * event.itemsPerPage;
        this.listPage = this.orderList.slice(startItem, endItem);
    }

}
