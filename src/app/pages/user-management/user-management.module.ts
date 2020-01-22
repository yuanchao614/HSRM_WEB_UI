import { NgModule } from '@angular/core';
import { UserManagementComponent } from './user-management.component';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserProleComponent } from './user-prole/user-prole.component';
import { AddUserComponent } from './user-prole/add-user/add-user.component';
import { UploadAvctorComponent } from './user-prole/upload-avctor/upload-avctor.component';
import { UpdatePasswordComponent } from './user-prole/update-password/update-password.component';
import { OperatorRecordComponent } from './operator-record/operator-record.component';



const COMPONENT = [
  UserManagementComponent,
    UserProleComponent,
    AddUserComponent,
    UploadAvctorComponent,
    UpdatePasswordComponent,
    OperatorRecordComponent
];

const routes: Routes = [
  {
    path: '',
    component: UserManagementComponent,
    children: [
      {path: 'user-prole', component: UserProleComponent},
      {path: 'operator', component: OperatorRecordComponent}
    //   {path: 'monitor', component: MonitorComponent}
    ]
},
];



@NgModule({
  imports: [ CommonModule, NgZorroAntdModule, ReactiveFormsModule, FormsModule, RouterModule.forChild(routes)],
  declarations: COMPONENT,
})
export class UserManagementModule { }
