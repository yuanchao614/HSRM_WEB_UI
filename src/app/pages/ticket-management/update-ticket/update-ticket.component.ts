import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { TicketManagementService } from '../ticket-management-service';

@Component({
  selector: 'app-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.css']
})
export class UpdateTicketComponent implements OnInit {

 // checkbox
 allChecked = false;
 indeterminate = false;
 checkbox = true;
 singleTrData: any;
 renderHeader = [
   {
     name: '列车编号',
     key: null,
     value: 'hsrail_num',
     isChecked: true
   },
   {
     name: '出发站',
     key: null,
     value: 'start_station',
     isChecked: true
   },
   {
     name: '终点站',
     key: null,
     value: 'end_station',
     isChecked: true
   },
   {
     name: '出发时间',
     key: null,
     value: 'startTime',
     isChecked: true
   },
   {
     name: '预计到达时间',
     key: null,
     value: 'endTime',
     isChecked: true
   },
   {
     name: '票价',
     key: null,
     value: 'ticket_price',
     isChecked: true
   },
   {
     name: '余票',
     key: null,
     value: 'total_Ticket',
     isChecked: true
   },
   {
     name: '车票类型',
     key: null,
     value: 'ticket_type',
     isChecked: true
   },
   {
    name: '票价',
    key: null,
    value: 'ticket_price2',
    isChecked: true
  },
  {
    name: '余票',
    key: null,
    value: 'total_Ticket2',
    isChecked: true
  },
  {
    name: '车票类型',
    key: null,
    value: 'ticket_type2',
    isChecked: true
  },
  {
    name: '票价',
    key: null,
    value: 'ticket_price3',
    isChecked: true
  },
  {
    name: '余票',
    key: null,
    value: 'total_Ticket3',
    isChecked: true
  },
  {
    name: '车票类型',
    key: null,
    value: 'ticket_type3',
    isChecked: true
  }
 ];
 listOfData = [];
 stationList = [];

 constructor(
   private ticketManagementService: TicketManagementService,
   private message: NzMessageService,
   private router: Router
 ) { }

 ngOnInit() {
   this.getData();
 }

 getData() {
   this.ticketManagementService.getTickets().subscribe((r) => {
     console.log(r);
     const res: any = r;
     if (res.code === 5001) {
      //  this.stationList = res.data.pass_station;
       this.listOfData = res.data.result;
       this.listOfData.forEach(item => {
         item.changeStartTime = this.ticketManagementService.changeDate(Number(item.startTime), 1, true);
         item.changeEndTime = this.ticketManagementService.changeDate(Number(item.endTime), 1, true);
       });
       this.message.create('success', `${r.msg}`);
     }
   });
 }

 deleteTicketById() {
   const clickTr = [];
   this.listOfData.forEach(item => {
     if (item.checked) {
       clickTr.push(item);
     }
   });
   if (clickTr.length === 1) {
     this.singleTrData = clickTr[0];
     const param = {
       id: this.singleTrData.id
     };
     this.ticketManagementService.deleteTicketById(param).subscribe(r => {
       console.log(r);
       if (r.code === 5003) {
         this.getData();
         this.message.create('success', `${r.msg}`);
       }
     });
   } else {
     this.message.create('warning', `请选中一条数据!`);
   }
 }

 addTicket() {
   this.router.navigate(['/emas/ticket-management/add-ticket']);
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
