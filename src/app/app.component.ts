import { Component } from '@angular/core';
import { LoginService } from './auth/login.service';


@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  isCollapsed = false;

  constructor(
        private ls: LoginService,
        ) {
        // 判断本地token是否需要用户登录
        if (!this.ls.autoAccessToken()) {
          console.warn('token failure, please login!');
        }
      }
}
