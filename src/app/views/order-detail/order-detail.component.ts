import { ProductService } from './../../services/product.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { IProduct } from './../../../../backend/src/model/Product.model';
import { AlertService } from './../../services/alert-service.service';
import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../products/Product.model';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
    
    readonly ITENS_PER_PAGE: number = 10;
    readonly MAX_SIZE: number = 5;
    readonly DIRECTION_LINKS: boolean = true;
    readonly BOUNDARY_LINKS: boolean = true;
    TOTAL_ITEMS: number;
    TOTAL_PRODU: number;
    listProduct: IProduct[];
    listPageProduct: IProduct[];
    listPageItems: IProduct[]
    
    formOrder: FormGroup;
    productList: IProduct[];
    orderId: number;

    constructor(
        private actRoute: ActivatedRoute,
        private fb: FormBuilder,
        private oService: OrderService,
        private pService: ProductService,
        private alertService: AlertService
    ) { }

    ngOnInit(): void {
        this.formOrder = this.fb.group({
            OrderID: [null],
            CustomerID: [null],
            EmployeeID: [null],
            OrderDate: [null],
            RequiredDate: [null],
            ShippedDate: [null],
            ShipVia: [null],
            Freight: [null],
            ShipName: [null],
            ShipAddress: [null],
            ShipCity: [null],
            ShipRegion: [null],
            ShipPostalCode: [null],
            ShipCountry: [null]
        });

        this.actRoute.params.subscribe((param) => {
            this.orderId = parseInt(param.id);
        });

        if (this.orderId !== 0) {
            this.oService.getOrderById(this.orderId)
                .subscribe(data => {
                    this.formOrder.setValue(data);
                });
        }else {
            // this.pService.getProducts()
        }

    }

    onSubmit() {
        if(!this.formOrder.dirty){
            // ativa notificação para usuário
            this.alertService.alertWarning('Nenhum campo foi modificado. Realize alterações para prosseguir.');
        } else if(this.orderId === 0){
            this.oService.saveOrder(this.formOrder.value, this.productList)
            .subscribe(
                data => {
                    this.orderId = data.OrderID;
                    this.alertService.alertSuccess('Compra realizada com sucesso. ID da nova compra: ' + this.orderId);
            }, error => {
                this.alertService.alertDanger(error);
            });
        }
    }

    pageChangedProduct(event: PageChangedEvent) {
        const startItem = (event.page - 1) * event.itemsPerPage;
        const endItem = event.page * event.itemsPerPage;
        // this.listPageProduct = this.orderList.slice(startItem, endItem);
    }

    pageChangeditems(event: PageChangedEvent){
        const startItem = (event.page - 1) * event.itemsPerPage;
        const endItem = event.page * event.itemsPerPage;
        // this.listPageItems = this.orderList.slice(startItem, endItem);
    }

}
