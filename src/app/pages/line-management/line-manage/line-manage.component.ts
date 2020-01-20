import { Component, OnInit } from '@angular/core';
import { LineManagementService } from '../line-management-service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';



@Component({
  selector: 'app-line-manage',
  templateUrl: './line-manage.component.html',
  styleUrls: ['./line-manage.component.css']
})
export class LineManageComponent implements OnInit {
  // checkbox
  allChecked = false;
  indeterminate = false;
  checkbox = true;
  singleTrData: any;
  renderHeader = [
    {
      name: '线路编号',
      key: null,
      value: 'line_num',
      isChecked: true
    },
    {
      name: '出发站',
      key: null,
      value: 'start_city',
      isChecked: true
    },
    {
      name: '终点站',
      key: null,
      value: 'end_city',
      isChecked: true
    },
    {
      name: '出发时间',
      key: null,
      value: 'startTime',
      isChecked: true
    },
    {
      name: '到达时间',
      key: null,
      value: 'endTime',
      isChecked: true
    },
    {
      name: '中途站',
      key: null,
      value: 'Pass_station',
      isChecked: true
    },
    {
      name: '里程(km)',
      key: null,
      value: 'km',
      isChecked: true
    },
    {
      name: '票价',
      key: null,
      value: 'price',
      isChecked: true
    },
    {
      name: 'Max Speed(km/h)',
      key: null,
      value: 'max_speed',
      isChecked: true
    },
    {
      name: '备注',
      key: null,
      value: 'remark',
      isChecked: true
    }
  ];
  listOfData = [];
  stationList = [];

  constructor(
    private lineManagementService: LineManagementService,
    private message: NzMessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.lineManagementService.getLine().subscribe((r) => {
      console.log(r);
      const res: any = r;
      if (res.code === 2001) {
        this.stationList = res.data.pass_station;
        this.listOfData = res.data.result;
        this.listOfData.forEach(item => {
          item.changeStartTime = this.lineManagementService.changeDate(Number(item.startTime), 1, true);
          item.changeEndTime = this.lineManagementService.changeDate(Number(item.endTime), 1, true);
        });
        this.message.create('success', `${r.msg}`);
      }
    });
  }

  deleteLineById() {
    const clickTr = [];
    this.listOfData.forEach(item => {
      if (item.checked) {
        clickTr.push(item);
      }
    });
    if (clickTr.length === 1) {
      this.singleTrData = clickTr[0];
      const param = {
        id: this.singleTrData.line_num
      };
      this.lineManagementService.deleteLineById(param).subscribe(r => {
        console.log(r);
        if (r.code === 2002) {
          this.getData();
          this.message.create('success', `${r.msg}`);
        }
      });
    } else {
      this.message.create('warning', `请选中一条数据!`);
    }
  }

  addLine() {
    this.router.navigate(['/emas/line-management/add-line']);
  }

  // editLine() {
  //   this.router.navigate(['/emas/line-management/edit-line']);
  // }

  goEditView() {
    const clickTr = [];
    this.listOfData.forEach(item => {
      if (item.checked) {
        clickTr.push(item);
      }
    });
    if (clickTr.length === 1) {
      // this.singleTrData = this.bully.setBSubject({
      //   type: CUSTOMER_MANAGEMENT.MODIFY_VIEW,
      //   data: clickTr[0]
      // });
      localStorage.setItem('EDIT_VIEW_LINE', JSON.stringify(clickTr[0]));
      this.router.navigate(['/emas/line-management/edit-line']);
    } else {
      this.message.create('warning', `请选择一条数据！`);
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
