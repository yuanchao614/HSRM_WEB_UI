import { Component, OnInit } from '@angular/core';

declare let AMap: any;

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    const map = new AMap.Map('mapcontainer', {
      mapStyle: 'amap://styles/e0f1eb178b677b16bf0153dbacf83da9', // 设置地图的显示样式
      zoom: 10
  });
    console.log(map);
  }

}
