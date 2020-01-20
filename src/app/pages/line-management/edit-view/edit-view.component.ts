import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LineManagementService } from '../line-management-service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-view',
  templateUrl: './edit-view.component.html',
  styleUrls: ['./edit-view.component.css']
})
export class EditViewComponent implements OnInit, OnDestroy {
  validateForm: FormGroup;
  getBSubjectData: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService,
    private lineManagementService: LineManagementService
  ) { }

  ngOnInit() {
    this.initForm();
    this.getTrData();
    this.fatchForm();
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

  fatchForm(): void  {
    this.validateForm.patchValue({
      lineNum: this.getBSubjectData.line_num,
      startTime: moment(Number(this.getBSubjectData.startTime)).format(),
      endTime: moment(Number(this.getBSubjectData.endTime)).format(),
      startStation: this.getBSubjectData.start_city,
      endStation: this.getBSubjectData.end_city,
      price: this.getBSubjectData.price,
      km: this.getBSubjectData.km,
      maxSpeed: this.getBSubjectData.max_speed,
      remark: this.getBSubjectData.remark,
      passStation: this.getBSubjectData.pass_station
    });
  }

  getTrData() {
    this.getBSubjectData = JSON.parse(localStorage.getItem('EDIT_VIEW_LINE'));
    console.log(this.getBSubjectData);
  }

  editLine() {
    const value = this.validateForm.value;
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
    this.lineManagementService.updateLine(param).subscribe(r => {
    console.log(r);
    if (r.code === 2004) {
      this.message.create('success', `${r.msg}`);
    }
  });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    localStorage.removeItem('EDIT_VIEW_LINE');
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
    this.router.navigate(['/emas/line-management/update-line']);
  }
}
