import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-management.service';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';



@Component({
  selector: 'app-operator-record',
  templateUrl: './operator-record.component.html',
  styleUrls: ['./operator-record.component.css']
})
export class OperatorRecordComponent implements OnInit {
  // checkbox
  allChecked = false;
  indeterminate = false;
  checkbox = true;
  clickTrData: any;
  renderHeader = [
    {
      name: '操作ID',
      key: null,
      value: 'operator_id',
      isChecked: true
    },
    {
      name: '操作用户名',
      key: null,
      value: 'operator_name',
      isChecked: true
    },
    {
      name: '操作数据',
      key: null,
      value: 'operator_data',
      isChecked: true
    },
    {
      name: '操作类型',
      key: null,
      value: 'operator_type',
      isChecked: true
    },
    {
      name: '操作模块',
      key: null,
      value: 'operator_module',
      isChecked: true
    },
    {
      name: '操作时间',
      key: null,
      value: 'operator_time',
      isChecked: true
    },
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
    this.userService.getOperatorRecords().subscribe(r => {
      console.log(r);
      const res: any = r;
      const resData = res.data.result;
      resData.forEach(item => {
        item.operator_time = moment(item.operator_time).format('YYYY/M/DD HH:mm:ss');
      });
      this.listOfData = resData;
    });
  }

  deleteOperator() {
    const clickTr = [];
    this.listOfData.forEach(item => {
      if (item.checked) {
        clickTr.push(item);
      }
    });
    if (clickTr.length === 1) {
      this.clickTrData = clickTr[0];
      const param = {
        id: this.clickTrData.operator_id
      };
      this.userService.deleteOperator(param).subscribe(r => {
        console.log(r);
        if (r.code === 100000) {
          this.getData();
          this.message.create('success', `${r.msg}`);
        }
      });
    } else {
      this.message.create('warning', `请选中一条数据!`);
    }
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

}
