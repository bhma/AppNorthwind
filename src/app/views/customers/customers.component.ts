import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

    FLAG: string = 'BHMA';

    constructor(
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    addCustomer() {
        
    }

}