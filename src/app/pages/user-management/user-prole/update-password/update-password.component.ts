import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user-management.service';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  @Input() updateIsVisble: boolean;
  @Input() updateTrData: any;
  @Output() closeModal = new EventEmitter();

  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.initForm();
    this.fatchForm();
    console.log(this.updateTrData);
    console.log(this.validateForm);
  }

  initForm() {
    this.validateForm = this.fb.group({
      userName: [{ value: null, disabled: false }],
      oldPassword: [{ value: null, disabled: false }],
      newPassword: [{ value: null, disabled: false }],
      conformPassword: [{ value: null, disabled: false }],
      // update_time: [{ value: new Date(), disabled: false }],
    });
  }

  fatchForm(): void  {
    this.validateForm.patchValue({
      userName: this.updateTrData.username,
      oldPassword: this.updateTrData.password
    });
  }

  submitForm(): void {
    console.log(this.validateForm);
  }

  updatePassword() {
    const username = this.validateForm.value.userName;
    const oldPassword = this.validateForm.value.oldPassword;
    const newPassword = this.validateForm.value.newPassword;
    const conformPassword = this.validateForm.value.conformPassword;
    // const time = this.validateForm.value.update_time;
    const data = {
      username,
      oldPassword,
      newPassword,
      conformPassword,
      updateTime:  moment().format('YYYY-MM-DD HH:mm:ss')
    };
    const param = data;
    this.userService.updatePassword(param).subscribe(r => {
      console.log(r);
      const res: any = r;
      if (res.code === 200) {
        this.operatorLog();
        this.updateIsVisble = false;
        this.message.create('success', `${res.msg}`);
        this.closeModal.emit();
      } else {
        this.message.create('error', `${res.msg}`);
      }
    });
  }

  handleCancelMiddle(): void {
    console.log('click cancel');
    this.updateIsVisble = false;
    this.closeModal.emit();
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.updatePassword();
  }

  operatorLog() {
    // tslint:disable-next-line: variable-name
    // const operator_id = this.clickTrData.user_id;
    // tslint:disable-next-line: variable-name
    const operator_name = localStorage.getItem('user_name');
    // tslint:disable-next-line: variable-name
    const operator_data = this.updateTrData.username;
    // tslint:disable-next-line: variable-name
    const data = {
      // operator_id,
      operator_name,
      operator_data: `用户名为${operator_data}`,
      operator_type: '修改',
      operator_module: 'User-Management',
      operator_time: moment().format('YYYY-MM-DD HH:mm:ss')
    };
    // tslint:disable-next-line: max-line-length
    const param = data;
    this.userService.operatorlog(param).subscribe(r => {
      console.log(r);
    });
  }


}
