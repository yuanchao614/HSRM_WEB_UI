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
      { path: 'welcome', loadChildren: './pages/welcome/welcome.module#WelcomeModule' },
    ]
  },
  // { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
