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
    if (this.validateForm.invalid) {
      return;
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
      console.log(r);
      const res: any = r;
      if (res.code === 0) {
        // const res: any = r;
        const loginInfo = {
          Authorization: res.data.userInfo.token,
          name: res.data.userInfo.username,
          role_id: res.data.userInfo.role_id
      };
        this._setUserInfo(loginInfo);
        this.router.navigate(['/emas/welcome/home']);
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
