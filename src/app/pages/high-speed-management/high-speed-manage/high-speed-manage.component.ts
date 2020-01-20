import { Component, OnInit } from '@angular/core';
import { HighSpeedManagementService } from '../high-speed-management-service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-high-speed-manage',
  templateUrl: './high-speed-manage.component.html',
  styleUrls: ['./high-speed-manage.component.css']
})
export class HighSpeedManageComponent implements OnInit {

  // checkbox
  allChecked = false;
  indeterminate = false;
  checkbox = true;
  singleTrData: any;
  renderHeader: any;
  listOfData = [];
  stationList = [];

  constructor(
    private highSpeedManagementService: HighSpeedManagementService,
    private message: NzMessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.renderHeader = [
      {
        name: '高铁编号',
        key: null,
        value: 'rail_id',
        isChecked: true
      },
      {
        name: '高铁型号',
        key: null,
        value: 'rail_type',
        isChecked: true
      },
      {
        name: '使用时间',
        key: null,
        value: 'use_time',
        isChecked: true
      },
      {
        name: '创建时间',
        key: null,
        value: 'create_time',
        isChecked: true
      }, {
        name: '修改时间',
        key: null,
        value: 'update_time',
        isChecked: true
      },
      {
        name: '最高时速',
        key: null,
        value: 'max_speed',
        isChecked: true
      },
      {
        name: '车厢数量',
        key: null,
        value: 'car_num',
        isChecked: true
      },
      {
        name: '座位数量',
        key: null,
        value: 'site_num',
        isChecked: true
      },
      {
        name: '电视',
        key: null,
        value: 'tv',
        isChecked: true
      },
      {
        name: '空调',
        key: null,
        value: 'airK',
        isChecked: true
      },
      {
        name: '充电',
        key: null,
        value: 'power',
        isChecked: true
      }
    ];
    this.getData();
  }

   getData() {
     this.highSpeedManagementService.getHighSpeedRail().subscribe((r) => {
       console.log(r);
       const res: any = r;
       if (res.code === 3001) {
         this.listOfData = res.data.result;
         this.message.create('success', `${r.msg}`);
       }
     });
   }

   deleteRailById() {
     const clickTr = [];
     this.listOfData.forEach(item => {
       if (item.checked) {
         clickTr.push(item);
       }
     });
     if (clickTr.length === 1) {
       this.singleTrData = clickTr[0];
       const param = {
         id: this.singleTrData.hs_carId
       };
       this.highSpeedManagementService.deleteRailById(param).subscribe(r => {
         console.log(r);
         if (r.code === 3003) {
           this.getData();
           this.message.create('success', `${r.msg}`);
         }
       });
     } else {
       this.message.create('warning', `请选中一条数据!`);
     }
   }

  addHighSpeedRail() {
    this.router.navigate(['/emas/high-speed-management/add-high-speed']);
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
      localStorage.setItem('EDIT_VIEW_RAIL', JSON.stringify(clickTr[0]));
      this.router.navigate(['/emas/high-speed-management/update-high-speed']);
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
