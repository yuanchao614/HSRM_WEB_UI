import { NgModule } from '@angular/core';
import { LineManagementComponent } from './line-management.component';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LineManageComponent } from './line-manage/line-manage.component';
import { AddLineComponent } from './add-line/add-line.component';
import { EditViewComponent } from './edit-view/edit-view.component';


const COMPONENT = [
    LineManagementComponent,
    LineManageComponent,
    AddLineComponent,
    EditViewComponent
];

const routes: Routes = [
  {
    path: '',
    component: LineManagementComponent,
    children: [
      {path: 'line-manage', component: LineManageComponent},
      {path: 'add-line', component: AddLineComponent},
      {path: 'edit-line', component: EditViewComponent}
    //   {path: 'monitor', component: MonitorComponent}
    ]
},
];



@NgModule({
  imports: [ CommonModule, NgZorroAntdModule, ReactiveFormsModule, FormsModule, RouterModule.forChild(routes)],
  declarations: COMPONENT,
})
export class LineManagementModule { }
