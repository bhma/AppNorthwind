import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ICustomer } from '../model/Customer.model';
import { take } from 'rxjs/operators';


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
        return this.http.get<ICustomer[]>(`${this.API}/customers`)
        .pipe(take(1));
    }

    getCustomerById(customerId: string){
        let params = new HttpParams();
        params = params.append('CustomerID', customerId);
        return this.http.get<ICustomer>(`${this.API}/customerbyid`, { params: params })
        .pipe(take(1));
    }

    saveCustomer(newCustomer: ICustomer){
        return this.http.post<ICustomer>(`${this.API}/newcustomer`, newCustomer)
        .pipe(take(1));
    }

    updateCustomer(updtCustomer: ICustomer){
        return this.http.put<ICustomer>(`${this.API}/updatecustomer`, updtCustomer)
        .pipe(take(1));
    }

    deleteCustomer(customerId: string){
        let params = new HttpParams();
        params = params.append('CustomerID', customerId);
        return this.http.delete<ICustomer>(`${this.API}/delcustomer`, { params: params } )
        .pipe(take(1));
    }
}
