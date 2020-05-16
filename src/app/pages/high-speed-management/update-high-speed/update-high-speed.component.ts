import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HighSpeedManagementService } from '../high-speed-management-service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import * as moment from 'moment';

@Component({
  selector: 'app-update-high-speed',
  templateUrl: './update-high-speed.component.html',
  styleUrls: ['./update-high-speed.component.css']
})
export class UpdateHighSpeedComponent implements OnInit, OnDestroy {

  validateForm: FormGroup;
  getBSubjectData: any;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService,
    private highSpeedManagementService: HighSpeedManagementService
  ) { }

  ngOnInit() {
    this.initForm();
    this.getTrData();
    this.fatchForm();
  }

  initForm() {
    this.validateForm = this.fb.group({
      railId: [{ value: null, disabled: false }],
      railNum: [{ value: null, disabled: false }],
      siteNum: [{ value: null, disabled: false }],
      useTime: [{ value: null, disabled: false }],
      airc: [{ value: null, disabled: false }],
      charging: [{ value: null, disabled: false }],
      tv: [{ value: null, disabled: false }],
      type: [{ value: null, disabled: false }],
      carNum: [{ value: null, disabled: false }],
      maxSpeed: [{ value: null, disabled: false }]
      // create_time: [{ value: new Date(), disabled: false }],
    });
  }

  fatchForm(): void  {
    this.validateForm.patchValue({
      railId: this.getBSubjectData.hs_carId,
      railNum: this.getBSubjectData.hs_carnum,
      siteNum: this.getBSubjectData.site_num,
      useTime: this.getBSubjectData.use_time,
      airc: String(this.getBSubjectData.has_airc),
      charging: String(this.getBSubjectData.charging),
      tv: String(this.getBSubjectData.has_tv),
      type: this.getBSubjectData.hs_type,
      carNum: this.getBSubjectData.hs_numCar,
      maxSpeed: this.getBSubjectData.max_speed
    });
  }

  submitForm(): void {
    console.log(this.validateForm);
  }

  getTrData() {
    this.getBSubjectData = JSON.parse(localStorage.getItem('EDIT_VIEW_RAIL'));
    console.log(this.getBSubjectData);
  }

  editRail() {
    const value = this.validateForm.value;
    const param = {
      hs_carId: value.railId,
      hs_carnum: value.railNum,
      site_num: value.siteNum,
      use_time: value.useTime,
      has_airc: Number(value.airc),
      charging: Number(value.charging),
      has_tv: Number(value.tv),
      hs_type: value.type,
      hs_numCar: value.carNum,
      max_speed: value.maxSpeed,
      updateTime: moment().format('YYYY-MM-DD HH:mm:ss')
    };
    this.highSpeedManagementService.updateRail(param).subscribe(r => {
      console.log(r);
      if (r.code === 3004) {
        this.message.create('success', `${r.msg}`);
        this.back();
      } else if (r.code === -1) {
        this.message.create('warning', `${r.msg}`);
      }
    });
  }

  ngOnDestroy(): void {
    localStorage.removeItem('EDIT_VIEW_RAIL');
  }
  // time
  onChange(result: Date): void {
    console.log('Selected Time: ', result);
  }

  onOk(result: Date): void {
    console.log('onOk', result);
  }

  back() {
    this.router.navigate(['/emas/high-speed-management/high-speed-manage']);
  }

}
