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
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';




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
    FooterComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
  exports: [
      MenuBarComponent,
      FooterComponent
  ]
})
export class ViewsModule { 
    
}
