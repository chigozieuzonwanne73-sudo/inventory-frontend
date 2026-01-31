import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { LayoutComponent } from './layout/layout.component';
import { VerticalLayoutComponent } from './shared/components/layouts/vertical-layout/vertical-layout.component';

export const routes: Routes = [
    {
        path: 'auth',
       // component: AuthLayoutComponent,
        loadChildren: () => import('./features/authentication/authentication.module').then(m => m.AuthenticationModule),
        data: { title: 'Authentication'}
      },
      {
        path: '',
        component: VerticalLayoutComponent,
        //canActivate: [AuthGuard],
        loadChildren: () => import('./features/views/views.module').then(m => m.ViewsModule),
        
      },
      
      {
        path: '**',
        redirectTo: '/404'
      }

];
