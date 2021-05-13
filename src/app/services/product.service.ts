import { IOrderDetail } from './../../../backend/src/model/OrderDetail.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IProduct } from '../model/Product.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    API = environment.API_URL;

    constructor(
        private http: HttpClient
    ) { }

    getProducts(){
        return this.http.get<IProduct[]>(`${this.API}/products`)
        .pipe(take(1));
    }

    getProductById(productId: number){
        let params = new HttpParams();
        params = params.append('OrderID', productId.toString());
        return this.http.get<IProduct>(`${this.API}/productbyid`, { params: params })
        .pipe(take(1));
    }

    getProductsByOrderId(orderID: number){
        let params = new HttpParams();
        params = params.append('OrderID', orderID.toString());
        return this.http.get<IOrderDetail[]>(`${this.API}/productbyorder`, { params: params })
        .pipe(take(1));
    }
}