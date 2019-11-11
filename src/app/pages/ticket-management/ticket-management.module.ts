import { NgModule } from '@angular/core';
import { TicketManagementComponent } from './ticket-management.component';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UpdateTicketComponent } from './update-ticket/update-ticket.component';
import { AddTicketComponent } from './add-ticket/add-ticket.component';


const COMPONENT = [
    TicketManagementComponent,
    UpdateTicketComponent,
    AddTicketComponent
];

const routes: Routes = [
  {
    path: '',
    component: TicketManagementComponent,
    children: [
      {path: 'update-ticket', component: UpdateTicketComponent},
      {path: 'add-ticket', component: AddTicketComponent}
    ]
},
];



@NgModule({
  imports: [ CommonModule, NgZorroAntdModule, ReactiveFormsModule, FormsModule, RouterModule.forChild(routes)],
  declarations: COMPONENT,
})
export class TicketManagementModule { }
