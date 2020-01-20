import { enableProdMode } from '@angular/core';
// import { DEBUG_INFO_ENABLED, SERVER_API_URL } from 'app/app.constants';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders, HttpEvent, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';
import { LoginService } from 'src/app/auth/login.service';

// import { LoginService } from 'app/core/login/login.service';
// import { UserManagementService } from 'app/user-management/user-management.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    constructor(
        private message: NzMessageService,
        private http: HttpClient,
        private ls: LoginService,
        // private userManagementService: UserManagementService
    ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any> | any> {
        let _headers = new HttpHeaders()
            .set('Authorization', this.ls.getAccessToken() + '')
            // .set('X-Requested-With', 'XMLHttpRequest')
            .set('Content-Type', 'application/json')
            .set('Accept', '*/*');
            // .set('tenantId', `${localStorage.getItem('tenant_id')}`);
        // .set('userName', localStorage.getItem('user_name') || '');

        const body = req.body;
        const isFormData = body instanceof FormData;

        req.headers.keys().forEach(item => {
            _headers = _headers.set(item, req.headers.get(item));
        });

        const authReq = req.clone({
            headers: _headers
        });
        console.log(authReq);

        return next.handle(isFormData ? req : authReq).pipe(
            catchError((err: HttpErrorResponse) => {
                this.handleError(err.status);
                throw err;
            })
        );
    }

    // 报错信息
    handleError(status) {
        if (status === 0) {
            this.message.error(`${status} please checkout the network`);
        } else if (status === 401) {
            // this.msg.error(`user token out of date`);
            this.ls.logOut();
        } else if (status === 404) {
            this.message.error('The requested resource does not exist');
        } else if (status === 500) {
            this.message.error('server error, please try again later');
        } else {
            // this.msg.error('未知错误，请检查网络');
            console.error('an unknown error');
        }
    }
}
