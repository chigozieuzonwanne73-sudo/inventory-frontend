import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // OWNER ROUTES
  {
    path: 'owner',
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { title: 'Dashboard', role: 'owner' }
      },
      {
        path: 'transactions',
        loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsModule),
        data: { title: 'Transactions' }
      },
      {
        path: 'checkout',
        loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule),
        data: { title: 'Checkout Monitor' }
      },
      {
        path: 'products',
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
        data: { title: 'Products' }
      },
      {
        path: 'shops',
        loadChildren: () => import('./shops/shops.module').then(m => m.ShopsModule),
        data: { title: 'Shops' }
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
        data: { title: 'Users' }
      },
      {
        path: 'reports',
        loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule),
        data: { title: 'Reports' }
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
        data: { title: 'Settings' }
      },
      {
        path: '',
        redirectTo: 'reports',
        pathMatch: 'full'
      }
    ]
  },

  // CASHIER ROUTES
  {
    path: 'cashier',
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { title: 'Dashboard', role: 'cashier' }
      },
      {
        path: 'pos',
        loadChildren: () => import('./pos/pos.module').then(m => m.PosModule),
        data: { title: 'Point of Sale' }
      },
      {
        path: 'transactions',
        loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsModule),
        data: { title: 'My Transactions', role: 'cashier' }
      },
      {
        path: 'products',
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
        data: { title: 'Products', role: 'cashier' }
      },
      {
        path: 'shop',
        loadChildren: () => import('./shops/shops.module').then(m => m.ShopsModule),
        data: { title: 'My Shop', role: 'cashier' }
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
        data: { title: 'Settings' }
      },
      {
        path: '',
        redirectTo: 'pos',
        pathMatch: 'full'
      }
    ]
  },

  // DEFAULT REDIRECT
  {
    path: '',
    redirectTo: 'auth/signin',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
