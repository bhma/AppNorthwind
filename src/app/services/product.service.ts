import { HttpClient } from '@angular/common/http';
import { IProduct } from '../model/Product.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    API = environment.API_URL;
    productList: IProduct[];

    constructor(
        private http: HttpClient
    ) { }

    getProducts(){

    }

    getProductById(){
        
    }
}
