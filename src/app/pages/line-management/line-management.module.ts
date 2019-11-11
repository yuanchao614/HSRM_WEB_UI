import { NgModule } from '@angular/core';
import { LineManagementComponent } from './line-management.component';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UpdateLineComponent } from './update-line/update-line.component';
import { AddLineComponent } from './add-line/add-line.component';


const COMPONENT = [
    LineManagementComponent,
    UpdateLineComponent,
    AddLineComponent
];

const routes: Routes = [
  {
    path: '',
    component: LineManagementComponent,
    children: [
      {path: 'update-line', component: UpdateLineComponent},
      {path: 'add-line', component: AddLineComponent}
    //   {path: 'monitor', component: MonitorComponent}
    ]
},
];



@NgModule({
  imports: [ CommonModule, NgZorroAntdModule, ReactiveFormsModule, FormsModule, RouterModule.forChild(routes)],
  declarations: COMPONENT,
})
export class LineManagementModule { }
