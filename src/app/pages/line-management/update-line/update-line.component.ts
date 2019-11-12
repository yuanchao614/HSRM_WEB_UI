import { Component, OnInit } from '@angular/core';
import { LineManagementService } from '../line-management-service';

@Component({
  selector: 'app-update-line',
  templateUrl: './update-line.component.html',
  styleUrls: ['./update-line.component.css']
})
export class UpdateLineComponent implements OnInit {
  renderHeader = [
    {
      name: 'Line Num',
      key: null,
      value: 'line_num',
      isChecked: true
    },
    {
      name: 'Start City',
      key: null,
      value: 'start_city',
      isChecked: true
    },
    {
      name: 'End City',
      key: null,
      value: 'end_city',
      isChecked: true
    },
    {
      name: 'Pass Station',
      key: null,
      value: 'Pass_station',
      isChecked: true
    },
    {
      name: 'Km',
      key: null,
      value: 'km',
      isChecked: true
    },
    {
      name: 'Max Speed',
      key: null,
      value: 'max_speed',
      isChecked: true
    }
  ];
  listOfData = [];
  stationList = [];

  constructor(
    private lineManagementService: LineManagementService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.lineManagementService.getLine().subscribe((r) => {
      console.log(r);
      const res: any = r;
      this.stationList = res.data.pass_station;
      this.listOfData = res.data.result;
      console.log(this.stationList);
    });
  }

}
