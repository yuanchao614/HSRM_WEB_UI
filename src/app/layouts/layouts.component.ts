import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemService } from 'src/app/service/system.service';


@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css']
})
export class LayoutsComponent implements OnInit {
  time: any;
  userName: any;

  constructor(
    private router: Router,
    private systemService: SystemService
  ) {
    // 设置时间
    this.systemService.timeSet();
    console.log(this.systemService.time);
  }

  ngOnInit() {
    this.getUserName();
  }


  getUserName() {
    this.userName = localStorage.getItem('user_name');
    console.log(localStorage.getItem('user_name'));
  }

  logOut() {
    localStorage.removeItem('user_name');
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

}
