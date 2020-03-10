import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-management.service';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-font-user',
  templateUrl: './font-user.component.html',
  styleUrls: ['./font-user.component.css']
})
export class FontUserComponent implements OnInit {

  renderHeader = [
    {
      name: '手机号',
      key: null,
      value: 'phone_number',
      isChecked: true
    },
    {
      name: '用户名',
      key: null,
      value: 'user_name',
      isChecked: true
    },
    {
      name: '身份证号',
      key: null,
      value: 'id_card',
      isChecked: true
    },
    {
      name: '性别',
      key: null,
      value: 'sex',
      isChecked: true
    },
    {
      name: '密码',
      key: null,
      value: 'password',
      isChecked: true
    }
  ];
  listOfData = [];
  constructor(
    private userService: UserService,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.userService.getAllFontUser().subscribe(r => {
      console.log(r);
      const res: any = r;
      if (res.code === 200) {
        const resData = res.data.result;
        this.listOfData = resData;
        this.message.create('success', `${r.msg}`);
      } else {
        this.message.create('error', `${r.msg}`);
      }
    });
  }


}
