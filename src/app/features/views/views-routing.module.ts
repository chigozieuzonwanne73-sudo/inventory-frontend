import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LookupHistoryComponent } from './lookup-history/lookup-history.component';
import { SettingsComponent } from './settings/settings.component';
import { AssistantComponent } from './assistant/assistant.component';
import { VehicleListComponent } from './vehicle-lookup/vehicle-list/vehicle-list.component';
import { VehicleDetailsComponent } from './vehicle-lookup/vehicle-details/vehicle-details.component';
import { SubscriptionComponent } from './subscription/subscription/subscription.component';

const routes: Routes = [
  {
    path: 'lookup-history',
    component: LookupHistoryComponent,  
    data: { title: 'Lookup History'  }  
  },
  {
    path: 'settings',
    component: SettingsComponent,
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
    data: { title: 'Settings' }    
  },
  {
    path: 'lot',
    component: VehicleListComponent,
    data: { title: 'My Lot', view: 'Lot' }
  },
  {
    path: 'marketplace',
    component: VehicleListComponent,
    data: { title: 'Marketplace', view: 'Marketplace' }

  },
  {
    path: 'marketplace/:id',
    component: VehicleDetailsComponent
  },
 
  {
    path: 'lot/:id',
    component: VehicleDetailsComponent
  },
  {
    path: 'subscription',
    component: SubscriptionComponent
  },
  
  {
    path: 'assistant',
    loadChildren: () => import('./assistant/assistant.module').then(m => m.AssistantModule),
  },
  {
    path: 'vehicle-lookup',
    loadChildren: () => import('./vehicle-lookup/vehicle-lookup.module').then(m => m.VehicleLookupModule),
    data: { title: 'Lookup' }    
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
