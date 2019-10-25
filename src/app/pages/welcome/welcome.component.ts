import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  listOfData = ['1', '2', 'peter'];

  constructor(
  ) { }

  ngOnInit() {
    // this.getAllData();
  }

}
