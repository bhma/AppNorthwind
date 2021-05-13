import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { CustomersComponent } from './customers/customers.component';
import { HomeComponent } from './home/home.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    MenuBarComponent,
    CustomersComponent,
    HomeComponent,
    CustomerDetailComponent,
    OrdersComponent,
    OrderDetailComponent,
    ProductsComponent,
    ProductDetailComponent,
    FooterComponent,
    AlertModalComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    PaginationModule,
    ModalModule
  ],
  exports: [
      MenuBarComponent,
      FooterComponent,
      AlertModalComponent
  ]
})
export class ViewsModule { 
    
}
