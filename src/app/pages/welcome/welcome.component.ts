import { Component, OnInit } from '@angular/core';
import { AppServe } from '../App.serve';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  listOfData = [];

  constructor(
    private appServe: AppServe
  ) { }

  ngOnInit() {
    this.getAllData();
  }

  getAllData() {
    this.appServe.getData().subscribe((r) => {
      console.log(r);
      const res: any = r;
      this.listOfData = res.message;
    });
  }

}
