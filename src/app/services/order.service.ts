import { IOrderDetail } from './../model/OrderDetail.model';
import { IProduct } from './../model/Product.model';
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

    

    saveOrder(newOrder: IOrder, productList: IOrderDetail[]){
        let vetOrderDate = newOrder.OrderDate.toString().split('/');
        let vetShipDate = newOrder.ShippedDate.toString().split('/');
        newOrder.OrderDate = new Date(`${vetOrderDate[2]}-${vetOrderDate[1]}-${vetOrderDate[0]}`);
        newOrder.ShippedDate = new Date(`${vetShipDate[2]}-${vetShipDate[1]}-${vetShipDate[0]}`);

        const orderDetailList = productList.map(e => {
            return {
                OrderID: e.OrderID, 
                ProductID: e.ProductID, 
                Quantity: e.Quantity, 
                UnitPrice: e.UnitPrice, 
                Discount: e.Discount
            }
        });
        let objOrder = {
            ...newOrder,
            productList: orderDetailList
        }
        return this.http.post<IOrder>(`${this.API}/neworder`, objOrder)
        .pipe(take(1));
    }
}
