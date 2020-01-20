import { NgModule } from '@angular/core';
import { HighSpeedManagementComponent } from './high-speed-management.component';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UpdateHighSpeedComponent } from './update-high-speed/update-high-speed.component';
import { AddHighSpeedComponent } from './add-high-speed/add-high-speed.component';
import { HighSpeedManageComponent } from './high-speed-manage/high-speed-manage.component';


const COMPONENT = [
    HighSpeedManagementComponent,
    UpdateHighSpeedComponent,
    AddHighSpeedComponent,
    HighSpeedManageComponent
];

const routes: Routes = [
  {
    path: '',
    component: HighSpeedManagementComponent,
    children: [
      {path: 'high-speed-manage', component: HighSpeedManageComponent},
      {path: 'update-high-speed', component: UpdateHighSpeedComponent},
      {path: 'add-high-speed', component: AddHighSpeedComponent}
    ]
},
];



@NgModule({
  imports: [ CommonModule, NgZorroAntdModule, ReactiveFormsModule, FormsModule, RouterModule.forChild(routes)],
  declarations: COMPONENT,
})
export class HighSpeedManagementModule { }
