import { AlertService } from './../../services/alert-service.service';
import { ICustomer } from './../../model/Customer.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-customer-detail',
    templateUrl: './customer-detail.component.html',
    styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {
    
    formCustomer: FormGroup;
    customerId: string;
    findedCustomer$: Observable<ICustomer>;

    constructor(
        private actRoute: ActivatedRoute,
        private fb: FormBuilder,
        private cS: CustomerService,
        private alertService: AlertService
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

        if(this.customerId !== 'newCustomer'){
            this.findedCustomer$ = this.cS.getCustomerById(this.customerId);
            this.findedCustomer$.subscribe(data => {
                this.formCustomer.setValue(data);
            })
        }
    }

    onSubmit(){
        if(!this.formCustomer.dirty){
            // ativar notificação para usuário
            this.handleAlert();
        }else if(this.customerId === 'newCustomer'){
            // fazer um post para /newcustomer enviando o this.formCustomer.value
            const obsNewCustomer$ = this.cS.saveCustomer(this.formCustomer.value);
            obsNewCustomer$.subscribe(data => {
                this.customerId = this.formCustomer.get('CustomerID').value;
                console.log(data);
            });
            // ativar notificação para usuário
        }else if(this.customerId !== 'newCustomer'){
            // fazer um put para /updatecustomer enviando o this.formCustomer.value
            const obsUpdtCustomer = this.cS.updateCustomer(this.formCustomer.value);
            obsUpdtCustomer.subscribe(data => console.log(data));
            // ativar notificação para usuário
        }
    }
    onDelete(){
        if(this.customerId !== 'newCustomer'){
            // chamar função de delete no service
            const obsDelCustomer$ = this.cS.deleteCustomer(this.customerId);
            obsDelCustomer$.subscribe(data => console.log(data));
            //notificar usuário
        }
    }

    handleAlert(){
        this.alertService.alertWarning('Nenhum campo foi modificado. Realize alterações para prosseguir.');
    }

}
