import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { CustomersComponent } from './customers/customers.component';
import { HomeComponent } from './home/home.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';



@NgModule({
  declarations: [
    MenuBarComponent,
    CustomersComponent,
    HomeComponent,
    CustomerDetailComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
  ],
  exports: [
      MenuBarComponent,
      CustomersComponent,
      HomeComponent
  ]
})
export class ViewsModule { 
    
}
