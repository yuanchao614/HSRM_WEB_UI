import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user-management.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as moment from 'moment';

@Component({
  selector: 'app-user-prole',
  templateUrl: './user-prole.component.html',
  styleUrls: ['./user-prole.component.css']
})
export class UserProleComponent implements OnInit {

  renderHeader = [
    {
      name: 'User ID',
      key: null,
      value: 'id',
      isChecked: true
    },
    {
      name: 'Role ID',
      key: null,
      value: 'role_id',
      isChecked: true
    },
    {
      name: 'User Name',
      key: null,
      value: 'username',
      isChecked: true
    },
    {
      name: 'Real Name',
      key: null,
      value: 'realname',
      isChecked: true
    },
    {
      name: 'passWord',
      key: null,
      value: 'password',
      isChecked: true
    },
    {
      name: 'Create Time',
      key: null,
      value: 'create_time',
      isChecked: true
    },
    {
      name: 'Update Time',
      key: null,
      value: 'update_time',
      isChecked: true
    }
  ];
  validateForm: FormGroup;

  listOfData = [];
  isVisibleMiddle = false;
  deleteIsVisible = false;
  updateIsVisble = false;
  clickTrData = {};
  updateTrData = {};

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.initForm();
    this.getData();
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

  getData() {
    this.userService.getUser().subscribe((r) => {
      console.log(r);
      const res: any = r;
      if (res.code == 0) {
        this.message.create('success', `Data request successed`);
        const resData = res.data.result;
        resData.forEach(item => {
          item.createTime = moment(item.create_time).format('YYYY/M/DD HH:mm');
          item.updateTime = item.updateTime ? moment(item.update_time).format('YYYY/M/DD HH:mm') : 'never change password';
        });
        this.listOfData = resData;
      } else {
        this.message.create('warning', `Data request filed`);
      }
    });
  }

  refresh() {
    this.getData();
  }

  clickTr(data) {
    this.clickTrData = data;
  }

  showModalMiddle(): void {
    this.isVisibleMiddle = true;
  }

  deleteShowModal(): void {
    const atrrDataList = Object.keys(this.clickTrData);
    if (atrrDataList.length) {
      this.deleteIsVisible = true;
    } else {
      this.message.create('warning', `Please choice one user first`);
    }
  }

  updateShowModal(data) {
    this.updateIsVisble = true;
    this.updateTrData = data;
    console.log('------');
  }

  closeModal() {
    this.isVisibleMiddle = false;
  }

  deleteCloseModal() {
    this.deleteIsVisible = false;
  }
  updateCloseModal() {
    this.updateIsVisble = false;
  }

}
