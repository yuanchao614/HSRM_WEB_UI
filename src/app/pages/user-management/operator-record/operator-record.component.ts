import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-management.service';
import * as moment from 'moment';


@Component({
  selector: 'app-operator-record',
  templateUrl: './operator-record.component.html',
  styleUrls: ['./operator-record.component.css']
})
export class OperatorRecordComponent implements OnInit {
  renderHeader = [
    {
      name: 'Operator ID',
      key: null,
      value: 'operator_id',
      isChecked: true
    },
    {
      name: 'Operator Namme',
      key: null,
      value: 'operator_name',
      isChecked: true
    },
    {
      name: 'Operator Data',
      key: null,
      value: 'operator_data',
      isChecked: true
    },
    {
      name: 'Operator Type',
      key: null,
      value: 'operator_type',
      isChecked: true
    },
    {
      name: 'Operator Time',
      key: null,
      value: 'operator_time',
      isChecked: true
    },
  ];
  listOfData = [];
  constructor(
    private userService: UserService
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
        item.operator_time = moment(item.create_time).format('YYYY/M/DD HH:mm:ss');
      });
      this.listOfData = resData;
    });
  }

}
