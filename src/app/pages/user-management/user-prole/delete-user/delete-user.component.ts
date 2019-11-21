import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user-management.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {
  @Input() clickTrData: any;
  @Input() deleteIsVisible: boolean;
  @Output() deleteCloseModal = new EventEmitter();

  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.initForm();
    console.log(this.clickTrData);
  }

  initForm() {
    this.validateForm = this.fb.group({
      id: [{ value: null, disabled: false }],
      userName: [{ value: null, disabled: false }],
      realname: [{ value: null, disabled: false }],
      password: [{ value: null, disabled: false }],
      create_time: [{ value: new Date(), disabled: false }],
    });
  }

  submitForm(): void {
    console.log(this.validateForm);
  }

  handleCancelMiddle(): void {
    console.log('click cancel');
    this.deleteIsVisible = false;
    this.deleteCloseModal.emit();
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    const data = this.clickTrData;
    const param = '?name=' + data.username;
    this.userService.deleteUser(param).subscribe((r) => {
      console.log(r);
      const res: any = r;
      // const resData = res.code;
      if (res.code === 200) {
        this.operatorLog(data);
        this.message.create('success', `${res.msg}`);
      } else {
        this.message.create('error', `${res.msg}`);
      }
    });
    this.deleteIsVisible = false;
    this.deleteCloseModal.emit();
  }

  operatorLog(item) {
    const operatorId = item.user_id;
    const operatorName = localStorage.getItem('user_name');
    const operatorData = item.username;
    const operatorType = 'DeleteUser';
    const data = {
      operatorId,
      operatorName,
      operatorData,
      operatorType
    };
    // tslint:disable-next-line: max-line-length
    const param = `?operator_id=${data.operatorId}&operator_name=${data.operatorName}&operator_data=${data.operatorData}&operator_type=${operatorType}`;
    this.userService.operatorRecord(param).subscribe(r => {
      console.log(r);
    });
  }

}
