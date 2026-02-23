import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';

import { VerticalLayoutComponent } from './shared/components/layouts/vertical-layout/vertical-layout.component';
import { AuthGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    // component: AuthLayoutComponent,
    loadChildren: () => import('./features/authentication/authentication.module').then(m => m.AuthenticationModule),
    data: { title: 'Authentication' }
  },
  {
    path: '',
    component: VerticalLayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/views/views.module').then(m => m.ViewsModule),

  },

  {
    path: '**',
    redirectTo: '/404'
  }

];
