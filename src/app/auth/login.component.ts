import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;

  submitForm(): void {
    console.log(this.validateForm);
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.logIn();
  }

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  logIn() {
    const data = {
      userName: this.validateForm.value.userName,
      password: this.validateForm.value.password,
      remember: this.validateForm.value.remember
    };

    const param = '?name=' + data.userName + '&password=' + data.password;
    this.loginService.logIn(param).subscribe((r) => {
      const res: any = r;
      if (res == 0) {
        this.
      }
      console.log(r);
    });
  }

}
