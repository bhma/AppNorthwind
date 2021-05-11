import { take } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IOrder } from '../model/Order.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    API = environment.API_URL;
    ordersList: IOrder[];

    constructor(
        private http: HttpClient
    ) { }

    getOrders(){
        return this.http.get<IOrder[]>(`${this.API}/orders`)
        .pipe(take(1));
    }

    getOrderById(orderID: number){
        let params = new HttpParams();
        params = params.append('OrderID', orderID.toString());
        return this.http.get<IOrder>(`${this.API}/orderbyid`, { params: params })
        .pipe(take(1));
    }

    saveOrder(){

    }

    updateOrder(){

    }
}
