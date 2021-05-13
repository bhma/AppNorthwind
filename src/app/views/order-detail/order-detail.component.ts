import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ProductService } from './../../services/product.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { AlertService } from './../../services/alert-service.service';
import { OrderService } from './../../services/order.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IOrderDetail } from './../../model/OrderDetail.model';
import { IProduct } from './../../model/Product.model';

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
    listPageProduct: IProduct[];
    listPageItems: IOrderDetail[] = [];
    listProduct: IProduct[] = [];
    listProductByOrder: IOrderDetail[] = [];

    formOrder: FormGroup;
    productList: IProduct[];
    orderId: number;
    editListModal: BsModalRef;
    modalConfig = {
        class: 'modal-xl'
    }

    constructor(
        private actRoute: ActivatedRoute,
        private fb: FormBuilder,
        private oService: OrderService,
        private alertService: AlertService,
        private pService: ProductService,
        private modalService: BsModalService
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

        this.loadData();
    }

    onSubmit() {
        if (!this.formOrder.dirty) {
            // ativa notificação para usuário
            this.alertService.alertWarning('Nenhum campo foi modificado. Realize alterações para prosseguir.');
        } else if (!this.existOrder()) {
            this.oService.saveOrder(this.formOrder.value, this.listProductByOrder)
                .subscribe(
                    data => {
                        this.orderId = data.OrderID;
                        this.alertService.alertSuccess('Compra realizada com sucesso. ID da nova compra: ' + this.orderId);
                    }, error => {
                        this.alertService.alertDanger(error);
                    });
        }
    }

    loadData() {
        if (this.existOrder()) {
            this.oService.getOrderById(this.orderId)
                .subscribe(data => {
                    this.formOrder.setValue(data);
                });
            this.pService.getProductsByOrderId(this.orderId)
                .subscribe(data => {
                    this.listProductByOrder = data;
                    this.TOTAL_ITEMS = this.listProductByOrder.length;
                    this.listPageItems = this.listProductByOrder.slice(0, this.ITENS_PER_PAGE);
                });
        } else {
            this.pService.getProducts()
                .subscribe(data => {
                    this.listProduct = data;
                    this.TOTAL_PRODU = this.listProduct.length;
                    this.listPageProduct = this.listProduct.slice(0, this.ITENS_PER_PAGE);
                });
        }
    }

    openModal(template: TemplateRef<any>) {
        this.editListModal = this.modalService.show(template, this.modalConfig);
        this.listPageProduct = this.listProduct.slice(0, this.ITENS_PER_PAGE);
    }

    pageChangedProduct(event: PageChangedEvent) {
        const startItem = (event.page - 1) * event.itemsPerPage;
        const endItem = event.page * event.itemsPerPage;
        this.listPageProduct = this.listProduct.slice(startItem, endItem);
    }

    pageChangeditems(event: PageChangedEvent) {
        const startItem = (event.page - 1) * event.itemsPerPage;
        const endItem = event.page * event.itemsPerPage;
        this.listPageItems = this.listProductByOrder.slice(startItem, endItem);
    }

    existOrder() {
        return this.orderId !== 0;
    }

    existListPageitems() {
        return this.listPageItems.length !== 0;
    }

    removeProduct(productID: number){
        let indexP = this.listProductByOrder.findIndex(p => p.ProductID === productID);
        this.listProductByOrder.splice(indexP, 1);
        this.updateTableItems();
    }

    addProduct({ ProductID, ProductName, UnitPrice }: IProduct) {
        let indexP = this.listProductByOrder.findIndex(p => p.ProductID === ProductID);
        if (indexP === -1) {
            const newOrderDetail = {
                OrderID: this.orderId,
                ProductID: ProductID,
                ProductName: ProductName,
                Quantity: 1,
                UnitPrice: UnitPrice,
                Discount: 0
            }
            this.listProductByOrder.push(newOrderDetail);
        } else {
            let updateOD = this.listProductByOrder.find(p => p.ProductID === ProductID);
            updateOD.Quantity++;
            this.listProductByOrder.splice(indexP, 1, updateOD);
        }
        this.updateTableItems();
    }

    updateTableItems() {
        this.TOTAL_ITEMS = this.listProductByOrder.length;
        this.listPageItems = this.listProductByOrder.slice(0, this.ITENS_PER_PAGE);
    }

}
