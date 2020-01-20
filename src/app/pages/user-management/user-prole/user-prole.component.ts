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
      name: '用户ID',
      key: null,
      value: 'id',
      isChecked: true
    },
    {
      name: '角色ID',
      key: null,
      value: 'role_ID',
      isChecked: true
    },
    {
      name: '用户名',
      key: null,
      value: 'username',
      isChecked: true
    },
    {
      name: '用户真实姓名',
      key: null,
      value: 'realname',
      isChecked: true
    },
    {
      name: '密码',
      key: null,
      value: 'password',
      isChecked: true
    },
    {
      name: '创建时间',
      key: null,
      value: 'create_time',
      isChecked: true
    },
    {
      name: '修改时间',
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
   // checkbox
   allChecked = false;
   indeterminate = false;
   checkbox = true;
  clickTrData: any;
  updateTrData = {};
  userNameList = [];
  roleNameList = [];

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
      roleName: [{ value: null, disabled: false }],
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
      if (res.code === 0) {
        this.message.create('success', `Data request successed`);
        const resData = res.data.result;
        resData.forEach(item => {
          item.createTime = moment(item.create_time).format('YYYY/M/DD HH:mm');
          // tslint:disable-next-line: max-line-length
          item.updateTime = item.update_time ? moment(item.update_time).format('YYYY/M/DD HH:mm') : moment(item.create_time).format('YYYY/M/DD HH:mm');
        });
        this.listOfData = resData;
      } else {
        this.message.create('warning', `Data request filed`);
      }
    });
  }

  showModalMiddle(): void {
    this.isVisibleMiddle = true;
  }

  deleteUser() {
    const clickTr = [];
    this.listOfData.forEach(item => {
      if (item.checked) {
        clickTr.push(item);
      }
    });
    if (clickTr.length === 1) {
      this.clickTrData = clickTr[0];
      const param = {
        name: this.clickTrData.username
      };
      this.userService.deleteUser(param).subscribe(r => {
        console.log(r);
        if (r.code === 1002) {
          this.getData();
          this.operatorLog();
          this.message.create('success', `${r.msg}`);
        }
      });
    } else {
      this.message.create('warning', `请选中一条数据!`);
    }
  }

  updatePassword() {
    const clickTr = [];
    this.listOfData.forEach(item => {
      if (item.checked) {
        clickTr.push(item);
      }
    });
    if (clickTr.length === 1) {
      this.clickTrData = clickTr[0];
      this.updateTrData =  this.clickTrData;
      this.updateIsVisble = true;
    } else {
      this.message.create('warning', `请选中一条数据!`);
    }
  }

  updateShowModal(data) {
    this.updateIsVisble = true;
    this.updateTrData = data;
    console.log('------');
  }

  closeModal() {
    this.isVisibleMiddle = false;
    this.updateIsVisble = false;
    this.deleteIsVisible = false;
    setTimeout(() => {
      this.getData();
    }, 500);
  }

  // check
  refreshStatus(): void {
    const validData = this.listOfData.filter(value => !value.disabled);
    const allChecked = validData.length > 0 && validData.every(value => value.checked === true);
    const allUnChecked = validData.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = !allChecked && !allUnChecked;
  }

  checkAll(value: boolean): void {
    this.listOfData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }

  operatorLog() {
    const operator_name = localStorage.getItem('user_name');
    const operator_data = this.clickTrData.username;
    const data = {
      // operator_id,
      operator_name,
      operator_data: `用户名为${operator_data}`,
      operator_type: '删除',
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
