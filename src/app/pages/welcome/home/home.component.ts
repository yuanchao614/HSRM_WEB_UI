import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userNum: any;
  lineNum: any;

  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.homeService.getUser().subscribe(r => { // 获取用户数量
      console.log(r);
      const res: any = r;
      this.userNum = res.data.result.length;
    });
    this.homeService.getLine().subscribe(r => {
      console.log(r);
      const res: any = r;
      this.lineNum = res.data.result.length;
    });
  }

}
