import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutsComponent } from './layouts/layouts.component';
import { LoginComponent } from './auth/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'emas' },
  {
    path: 'emas',
    component: LayoutsComponent,
    children: [
      { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)},
      // tslint:disable-next-line: max-line-length
      { path: 'user-management', loadChildren: () => import('./pages/user-management/user-management.module').then(m => m.UserManagementModule)},
      // tslint:disable-next-line: max-line-length
      { path: 'line-management', loadChildren: () => import('./pages/line-management/line-management.module').then(m => m.LineManagementModule)},
      // tslint:disable-next-line: max-line-length
      { path: 'high-speed-management', loadChildren: () => import('./pages/high-speed-management/high-speed-management.module').then(m => m.HighSpeedManagementModule)},
      // tslint:disable-next-line: max-line-length
      { path: 'ticket-management', loadChildren: () => import('./pages/ticket-management/ticket-management.module').then(m => m.TicketManagementModule)}
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'emas/welcome', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
