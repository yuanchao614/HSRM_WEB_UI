import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketManagementService } from '../ticket-management-service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { HighSpeedManagementService } from '../../high-speed-management/high-speed-management-service';


@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css']
})
export class AddTicketComponent implements OnInit {

  validateForm: FormGroup;
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
    this.getData();
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

  addTicket() {
    const value = this.validateForm.value;
    console.log(value);
    const param = {
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
      ticket_type3: value.ticketType3
  };
    console.log(param);
    this.ticketManagementService.addTicket(param).subscribe(r => {
    console.log(r);
    if (r.code === 5002) {
      this.message.create('success', `${r.msg}`);
    } else {
      this.message.create('warnning', `${r.msg}`);
    }
  });
  }

  getData() {
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

  submitForm(): void {
    console.log(this.validateForm);
  }
  // time
  onChange(result: Date): void {
    console.log('Selected Time: ', result);
  }

  onOk(result: Date): void {
    console.log('onOk', result);
  }

  back() {
    this.router.navigate(['/emas/ticket-management/update-ticket']);
  }

}
