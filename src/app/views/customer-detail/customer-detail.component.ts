import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-customer-detail',
    templateUrl: './customer-detail.component.html',
    styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
    customerId: string;

    constructor(
        private router: Router,
        private actRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.actRoute.params.subscribe((param) => {
            this.customerId = param.id;
        });
    }

}
