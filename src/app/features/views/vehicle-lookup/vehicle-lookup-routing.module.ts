import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleLookupComponent } from './vehicle-lookup/vehicle-lookup.component';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';

const routes: Routes = [
  {
    path: '',
    component: VehicleLookupComponent,
    children: [
      {
        path: ':id',
        component: VehicleDetailsComponent
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleLookupRoutingModule { }
