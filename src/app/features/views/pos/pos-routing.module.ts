import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PosComponent } from './pos.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { DraftCartsComponent } from './draft-carts/draft-carts.component';

const routes: Routes = [
  { path: '', component: PosComponent },
  { path: 'drafts', component: DraftCartsComponent },
  { path: 'checkout', component: CheckoutComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosRoutingModule { }
