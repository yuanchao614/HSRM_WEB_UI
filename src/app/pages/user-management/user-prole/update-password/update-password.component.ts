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
    const userName = this.validateForm.value.userName;
    const oldPassword = this.validateForm.value.oldPassword;
    const newPassword = this.validateForm.value.newPassword;
    const conformPassword = this.validateForm.value.conformPassword;
    // const time = this.validateForm.value.update_time;
    const data = {
      userName,
      oldPassword,
      newPassword,
      conformPassword,
      // updateTime
    };
    // tslint:disable-next-line: max-line-length
    const param = `?name=${data.userName}&oldPassword=${data.oldPassword}&newPassword=${data.newPassword}&againPassword=${data.conformPassword}`;
    this.userService.updatePassword(param).subscribe(r => {
      console.log(r);
      const res: any = r;
      if (res.code === 200) {
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


}
