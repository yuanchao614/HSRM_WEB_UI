import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HighSpeedManagementService } from '../high-speed-management-service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import * as moment from 'moment';

@Component({
  selector: 'app-add-high-speed',
  templateUrl: './add-high-speed.component.html',
  styleUrls: ['./add-high-speed.component.css']
})
export class AddHighSpeedComponent implements OnInit {
  validateForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private message: NzMessageService,
    private highSpeedManagementService: HighSpeedManagementService
  ) { }

  ngOnInit() {
    this.initForm();
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

  submitForm(): void {
    console.log(this.validateForm);
  }

  addRail() {
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
      createTime: moment().format('YYYY-MM-DD HH:mm:ss')
    };
    this.highSpeedManagementService.addRail(param).subscribe(r => {
      console.log(r);
      if (r.code === 3002) {
        this.message.create('success', `${r.msg}`);
      } else if (r.code === -1) {
        this.message.create('warning', `${r.msg}`);
      }
    });
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
