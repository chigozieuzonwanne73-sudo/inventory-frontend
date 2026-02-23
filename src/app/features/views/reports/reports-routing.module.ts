import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsComponent
  },
  {
    path: 'sales',
    loadChildren: () => import('./sales-report/sales-report.module').then(m => m.SalesReportModule),
    data: { title: 'Sales Reports' }
  },
  {
    path: 'products',
    loadChildren: () => import('./product-report/product-report.module').then(m => m.ProductReportModule),
    data: { title: 'Product Performance' }
  },
  {
    path: 'monthly',
    loadChildren: () => import('./monthly-report/monthly-report.module').then(m => m.MonthlyReportModule),
    data: { title: 'Monthly Breakdown' }
  },
  { path: '', redirectTo: 'sales', pathMatch: "full" },
  { path: '**', redirectTo: 'sales' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
