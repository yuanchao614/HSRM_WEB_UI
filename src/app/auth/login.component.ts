import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

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
    private router: Router,
    private message: NzMessageService
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
      if (res.code == 0) {
        console.log(r);
        const loginInfo = {
          Authorization: 'user',
          name: this.validateForm.value.userName
      };
        this._setUserInfo(loginInfo)
        this.router.navigate(['/emas']);
      } else {
        this.message.create('error', `${res.msg}`);
      }
    });
  }

  private _setStorage(key, value): void {
    localStorage.setItem(key, value);
}

private _setUserInfo(userInfo: any): void {
  // console.log(userInfo);
  this._setStorage('access_token', userInfo.Authorization);
  this._setStorage('user_name', userInfo.name);
}

}
