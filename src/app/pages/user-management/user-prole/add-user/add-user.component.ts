import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user-management.service';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @Input() isVisibleMiddle: boolean;
  @Output() closeModal = new EventEmitter();

  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.initForm();
    console.log(this.validateForm);
  }

  initForm() {
    this.validateForm = this.fb.group({
      id: [{ value: null, disabled: false }],
      userName: [{ value: null, disabled: false }],
      realname: [{ value: null, disabled: false }],
      password: [{ value: null, disabled: false }],
      // create_time: [{ value: new Date(), disabled: false }],
    });
  }

  submitForm(): void {
    console.log(this.validateForm);
  }

  handleCancelMiddle(): void {
    console.log('click cancel');
    this.isVisibleMiddle = false;
    this.closeModal.emit();
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.addUser();
    this.isVisibleMiddle = false;
    this.closeModal.emit();

  }

  addUser() {
    const id = this.validateForm.value.id;
    const username = this.validateForm.value.userName;
    const realname = this.validateForm.value.realname;
    const password = this.validateForm.value.password;
    // const time = this.validateForm.value.create_time.moment;
    // const createTime = moment(time).format().split('+')[0];
    const data = {
      userId: id,
      userName: username,
      realName: realname,
      passWord: password,
      // create_time: createTime
    };
    console.log(data);
    // tslint:disable-next-line: max-line-length
    const param = '?id=' + data.userId + '&name=' + data.userName + '&realname=' + data.realName + '&password=' + data.passWord;
    this.userService.addUser(param).subscribe((r) => {
      console.log(r);
      const res: any = r;
      const resData = res.code;
      if (resData === 0) {
        this.message.create('success', `${res.msg}`);
      } else {
        this.message.create('error', `${res.msg}`);
      }
    });
  }

}
