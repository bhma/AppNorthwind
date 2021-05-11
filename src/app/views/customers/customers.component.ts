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
    customerList$: Observable<ICustomer[]>;

    constructor(
        private cService: CustomerService,
    ) { }

    ngOnInit(): void {
        this.customerList$ = this.cService.getCustomers();
    }

}
