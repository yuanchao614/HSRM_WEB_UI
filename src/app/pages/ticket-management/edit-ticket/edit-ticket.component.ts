import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketManagementService } from '../ticket-management-service';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css']
})
export class EditTicketComponent implements OnInit {
  validateForm: FormGroup;
  getBSubjectData: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ticketManagementService: TicketManagementService
  ) { }

  ngOnInit() {
    this.initForm();
    // 获取列表选中数据
    this.getTrData();
  }

  initForm() {
    this.validateForm = this.fb.group({
      carNum: [{ value: null, disabled: false }],
      startTime: [{ value: null, disabled: false }],
      endTime: [{ value: null, disabled: false }],
      startStation: [{ value: null, disabled: false }],
      endStation: [{ value: null, disabled: false }],
      refund: [{ value: null, disabled: false }],
      price1: [{ value: null, disabled: false }],
      ticketNum1: [{ value: null, disabled: false }],
      ticketType1: [{ value: null, disabled: false }],
      price2: [{ value: null, disabled: false }],
      ticketNum2: [{ value: null, disabled: false }],
      ticketType2: [{ value: null, disabled: false }],
      price3: [{ value: null, disabled: false }],
      ticketNum3: [{ value: null, disabled: false }],
      ticketType3: [{ value: null, disabled: false }]
    });
  }

  fatchForm(): void  {
    this.validateForm.patchValue({
      carNum: this.getBSubjectData.carNum,
      startTime: this.getBSubjectData.startTime,
      endTime: this.getBSubjectData.endTime,
      startStation: this.getBSubjectData.startStation,
      endStation: this.getBSubjectData.endStation,
      refund: this.getBSubjectData.refund,
      price1: this.getBSubjectData.refund,
      ticketNum1: this.getBSubjectData.refund,
      ticketType1: [{ value: null, disabled: false }],
      price2: [{ value: null, disabled: false }],
      ticketNum2: [{ value: null, disabled: false }],
      ticketType2: [{ value: null, disabled: false }],
      price3: [{ value: null, disabled: false }],
      ticketNum3: [{ value: null, disabled: false }],
      ticketType3: [{ value: null, disabled: false }]
    });
  }


  getTrData() {
    this.getBSubjectData = JSON.parse(localStorage.getItem('EDIT_VIEW_TICKET'));
    console.log(this.getBSubjectData);
  }

  editTicket() {
    console.log('eidt ticket');
    const value = this.validateForm.value;
    const param = {
      id: value.id,
      hs_railId: value,
      start_station: value,
      end_station: value,
      startTime: value,
      endTime: value,
      ticket_price1: value,
      ticket_num1: value,
      ticket_price2: value,
      ticket_num2: value,
      ticket_price3: value,
      ticket_num3: value,
      refund: value
  };
  }

}
