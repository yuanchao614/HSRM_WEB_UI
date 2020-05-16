import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketManagementService } from '../ticket-management-service';
import { HighSpeedManagementService } from '../../high-speed-management/high-speed-management-service';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd';


@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css']
})
export class EditTicketComponent implements OnInit {
  validateForm: FormGroup;
  getBSubjectData: any;
  listOption = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService,
    private ticketManagementService: TicketManagementService,
    private highSpeedManagementService: HighSpeedManagementService
  ) { }

  ngOnInit() {
    this.initForm();
    this.getData2();
    // 获取列表选中数据
    this.getTrData();
    this.fatchForm();
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
    // console.log(moment(this.getBSubjectData.startTime).format());
    this.validateForm.patchValue({
      carNum: this.getBSubjectData.hs_railId,
      startTime: moment(Number(this.getBSubjectData.startTime)).format(),
      endTime: moment(Number(this.getBSubjectData.endTime)).format(),
      startStation: this.getBSubjectData.start_station,
      endStation: this.getBSubjectData.end_station,
      refund: this.getBSubjectData.refund,
      price1: this.getBSubjectData.ticket_price1,
      ticketNum1: this.getBSubjectData.ticket_num1,
      ticketType1: this.getBSubjectData.ticket_type1,
      price2: this.getBSubjectData.ticket_price2,
      ticketNum2: this.getBSubjectData.ticket_num2,
      ticketType2: this.getBSubjectData.ticket_type2,
      price3: this.getBSubjectData.ticket_price3,
      ticketNum3: this.getBSubjectData.ticket_num3,
      ticketType3: this.getBSubjectData.ticket_type3,
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
      id: this.getBSubjectData.id,
      hs_railId: value.carNum,
      start_station: value.startStation,
      end_station: value.endStation,
      startTime: this.ticketManagementService.changeDate(value.startTime, 0),
      endTime: this.ticketManagementService.changeDate(value.endTime, 0),
      ticket_price1: value.price1,
      ticket_num1: value.ticketNum1,
      ticket_type1: value.ticketType1,
      ticket_price2: value.price2,
      ticket_num2: value.ticketNum2,
      ticket_type2: value.ticketType2,
      ticket_price3: value.price3,
      ticket_num3: value.ticketNum3,
      ticket_type3: value.ticketType3,
      refund: value.refund
  };
  console.log(param);
  this.ticketManagementService.updateTicket(param).subscribe(r => {
    console.log(r);
    if (r.code === 5004) {
      this.message.create('success', '修改成功');
      this.back();
    }
  });
  }

  getData2() {
    this.highSpeedManagementService.getHighSpeedRail().subscribe((r) => {
      console.log(r);
      const res: any = r;
      if (res.code === 3001) {
        const resData = res.data.result;
        resData.forEach(e => {
          this.listOption.push({label: e.hs_carnum, value: e.hs_carnum});
        });
        this.message.create('success', `${r.msg}`);
      }
    });
  }

  back() {
    this.router.navigate(['/emas/ticket-management/update-ticket']);
  }

}
