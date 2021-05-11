import { ICustomer } from './../../model/Customer.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
    selector: 'app-customer-detail',
    templateUrl: './customer-detail.component.html',
    styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
    
    formCustomer: FormGroup;
    customerId: string;
    findedCustomer: ICustomer;

    constructor(
        private actRoute: ActivatedRoute,
        private fb: FormBuilder,
        private cS: CustomerService
    ) { }

    ngOnInit(): void {
        this.formCustomer = this.fb.group({
            CustomerID: [null],
            CompanyName: [null],
            ContactName: [null],
            ContactTitle: [null],
            Address: [null],
            City: [null],
            Region: [null],
            PostalCode: [null],
            Country: [null],
            Phone: [null],
            Fax: [null],
        });

        this.actRoute.params.subscribe((params) => {
            this.customerId = params.id;
        });

        if(this.customerId !== null){
            // this.findedCustomer = this.cS.getCustomerById(this.customerId);
            this.formCustomer.setValue(this.findedCustomer);
        }
    }

    onSubmit(){
        console.log(this.formCustomer);
    }

}
