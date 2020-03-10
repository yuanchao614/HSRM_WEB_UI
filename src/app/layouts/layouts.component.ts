import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemService } from 'src/app/service/system.service';
import { LayoutsService } from './layouts.service';


@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css']
})
export class LayoutsComponent implements OnInit {
  time: any;
  userName: any;
  menuList = [];

  constructor(
    private router: Router,
    private systemService: SystemService,
    private layoutsService: LayoutsService
  ) {
    // 设置时间
    this.systemService.timeSet();
    console.log(this.systemService.time);
    this.menuList = [
      {
        id: this.isGuid(8),
        title: 'dashboard',
        icon: 'dashboard',
        active: true,
        isOpen: true,
        route: [
          {
            childRoute: '/emas/welcome/home',
            name: '首页'
          },
          {
            childRoute: '/emas/welcome/monitor',
            name: '地图'
          }
        ]
      },
      {
        id: this.isGuid(8),
        title: '高铁线路信息管理',
        icon: 'form',
        active: false,
        isOpen: false,
        route: [
          {
            childRoute: '/emas/line-management/line-manage',
            name: '高铁线路信息列表'
          },
          {
            childRoute: '/emas/line-management/add-line',
            name: '新增线路'
          }
        ]
      },
      {
        id: this.isGuid(8),
        title: '高铁列车信息管理',
        icon: 'dashboard',
        active: false,
        isOpen: false,
        route: [
          {
            childRoute: '/emas/high-speed-management/high-speed-manage',
            name: '高铁列车信息'
          },
          {
            childRoute: '/emas/high-speed-management/add-high-speed',
            name: '新增列车'
          }
        ]
      },
      {
        id: this.isGuid(8),
        title: '高铁车票信息管理',
        icon: 'transaction',
        active: false,
        isOpen: false,
        route: [
          {
            childRoute: '/emas/ticket-management/update-ticket',
            name: '车票信息'
          },
          {
            childRoute: '/emas/ticket-management/add-ticket',
            name: '新增车票'
          }
        ]
      },
      {
        id: this.isGuid(8),
        title: '用户信息管理',
        icon: 'user',
        active: false,
        isOpen: false,
        route: [
          {
            childRoute: '/emas/user-management/user-prole',
            name: '后台用户信息'
          },
          {
            childRoute: '/emas/user-management/font-user',
            name: '前台用户信息'
          },
          {
            childRoute: '/emas/user-management/operator',
            name: '操作日志'
          }
        ]
      }
    ];
  }

  ngOnInit() {
    // this.initMap();
    // this.showCityInfo();
  }


  // getUserName() {
  //   this.userName = localStorage.getItem('user_name');
  //   console.log(localStorage.getItem('user_name'));
  // }

  logOut() {
    const data = {
      userName: localStorage.getItem('user_name')
    };
    const param = `?name=${data.userName}`;
    this.layoutsService.loginOut(param).subscribe(r => {
      console.log(r);
    });
    localStorage.removeItem('user_name');
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }


  isGuid(size: number): string {
    let guid = '';
    for (let i = 1; i <= size; i++) {
      const n = Math.floor(Math.random() * 16.0).toString(16);
      guid += n;
    }
    return guid;
  }



}
