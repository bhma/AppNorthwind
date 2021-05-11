import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICustomer } from '../model/Customer.model';
import { filter, take, tap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    API = environment.API_URL;
    customerList: ICustomer[];

    constructor(
        private http: HttpClient
    ) {
        

    }

    getCustomers() {
        return this.http.get<ICustomer[]>(`${this.API}/api/customers`)
        .pipe(take(1));
    }

    getCustomerById(customerId: string){
        // this.getCustomers()
        // .subscribe(customerList => {
        //     this.customerList = customerList;
        // });

        // return this.customerList.find(element => element.CustomerID === customerId);
    }

}
