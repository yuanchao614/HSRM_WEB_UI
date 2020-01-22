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
  imgData = {
    name: null,
    width: null,
    height: null,
    url: null,
    base64url: null
};

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
      user_id: id,
      username,
      realname,
      password,
      role_id: 1, // roleID注册时默认为1
      create_time:  moment().format('YYYY-MM-DD HH:mm:ss')
    };
    const param = data;
    console.log(data);
    this.userService.addUser(param).subscribe((r) => {
      console.log(r);
      const res: any = r;
      const resData = res.code;
      if (resData === 1003) {
        this.operatorLog();
        this.message.create('success', `${res.msg}`);
      } else {
        this.message.create('error', `${res.msg}`);
      }
    });
  }

  getBase64(file: File) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const base64Str = reader.result.toString();
      this.imgData.base64url = base64Str.split('base64,')[1]; //获取上传图片的base64码
      // this.selectItem.graphicContents = this.imgData.base64url;
      // console.log(this.imgData.base64url);
    });
    reader.readAsDataURL(file);
}

beforeUpload(e) {
  const file = e.srcElement.files[0]; // 获取上传图片的file对象
  this.getBase64(file);
  // console.log(file);
  // this.checkImageSize(file);
}

  operatorLog() {
    // tslint:disable-next-line: variable-name
    const operator_name = localStorage.getItem('user_name');
    // tslint:disable-next-line: variable-name
    const operator_data = this.validateForm.value.userName;
    const data = {
      // operator_id,
      operator_name,
      operator_data: `用户名为${operator_data}`,
      operator_type: '新增',
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
