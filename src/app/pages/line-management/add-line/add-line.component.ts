import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LineManagementService } from '../line-management-service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';




@Component({
  selector: 'app-add-line',
  templateUrl: './add-line.component.html',
  styleUrls: ['./add-line.component.css']
})
export class AddLineComponent implements OnInit {
  validateForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService,
    private lineManagementService: LineManagementService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.validateForm = this.fb.group({
      lineNum: [{ value: null, disabled: false }],
      startTime: [{ value: null, disabled: false }],
      endTime: [{ value: null, disabled: false }],
      startStation: [{ value: null, disabled: false }],
      endStation: [{ value: null, disabled: false }],
      price: [{ value: null, disabled: false }],
      km: [{ value: null, disabled: false }],
      maxSpeed: [{ value: null, disabled: false }],
      remark: [{ value: null, disabled: false }],
      passStation: [{ value: null, disabled: false }]
      // create_time: [{ value: new Date(), disabled: false }],
    });
  }

  addLine() {
    const value = this.validateForm.value;
    console.log(value);
    const param = {
      line_num: value.lineNum,
      start_city: value.startStation,
      end_city: value.endStation,
      km: value.km,
      pass_station: value.passStation,
      max_speed: value.maxSpeed,
      startTime: this.lineManagementService.changeDate(value.startTime, 0),
      endTime: this.lineManagementService.changeDate(value.endTime, 0),
      price: value.price,
      remark: value.remark
  };
    console.log(param);
    this.lineManagementService.addLine(param).subscribe(r => {
    console.log(r);
    if (r.code === 2003) {
      this.message.create('success', `${r.msg}`);
      this.back();
    } else {
      this.message.create('warning', `${r.msg}`);
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
    this.router.navigate(['/emas/line-management/line-manage']);
  }

}
