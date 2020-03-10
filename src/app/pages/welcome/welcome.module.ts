import { NgModule } from '@angular/core';
import { PublicComModule } from '../../public/public-com.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



// import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';

import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MonitorComponent } from './monitor/monitor.component';
import {NgxEchartsModule} from 'ngx-echarts';


const COMPONENT = [
  HomeComponent,
  MonitorComponent
];

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'monitor', component: MonitorComponent}
    ]
},
];



@NgModule({
  // tslint:disable-next-line: max-line-length
  imports: [ CommonModule, NgZorroAntdModule, ReactiveFormsModule, FormsModule, PublicComModule, RouterModule.forChild(routes), NgxEchartsModule],
  declarations: [WelcomeComponent, HomeComponent, MonitorComponent],
})
export class WelcomeModule { }
