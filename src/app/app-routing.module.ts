import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomersComponent } from './views/customers/customers.component';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
    { path: 'customers', component: CustomersComponent },
    { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
