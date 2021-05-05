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

    constructor(
        private actRoute: ActivatedRoute,
        private fb: FormBuilder,
        private cS: CustomerService
    ) { }

    ngOnInit(): void {
        this.actRoute.params.subscribe((param) => {
            this.customerId = param.id;
        });

        this.formCustomer = this.fb.group({
            companyName: [null],
            contactName: [null],
            contactTitle: [null],
            address: [null],
            city: [null],
            region: [null],
            postalCode: [null],
            country: [null],
            phone: [null],
            fax: [null],
        });

    }

    onSubmit(){
        console.log(this.formCustomer);
    }

}
