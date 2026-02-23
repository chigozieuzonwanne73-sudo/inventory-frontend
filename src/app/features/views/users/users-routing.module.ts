import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { CashiersComponent } from './cashiers/cashiers.component';

const routes: Routes = [
  { path: 'all', component: UsersComponent },
  { path: 'add', component: AddUserComponent },
  { path: 'checkout-staff', component: CashiersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
