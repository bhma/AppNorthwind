import { ICustomer } from './../../../../backend/src/model/Customer.model';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

    FLAG: string = 'newCustomer';
    pagAtual: number = 1;
    customer$: Observable<ICustomer[]>;
    customerList: ICustomer[];

    constructor(
        private cService: CustomerService,
    ) { }

    ngOnInit(): void {
        this.customer$ = this.cService.getCustomers();
        this.customer$.subscribe(data => {
            this.customerList = data;
        });
        console.log(this.customerList);
    }

}
