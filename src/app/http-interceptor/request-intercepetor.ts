import { enableProdMode } from '@angular/core';
// import { DEBUG_INFO_ENABLED, SERVER_API_URL } from 'app/app.constants';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders, HttpEvent, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';
// import { LoginService } from 'app/core/login/login.service';
// import { UserManagementService } from 'app/user-management/user-management.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    constructor(
        private message: NzMessageService,
        private http: HttpClient,
        // private ls: LoginService,
        // private userManagementService: UserManagementService
    ) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any> | any> {
        let _headers = new HttpHeaders();
        req.headers.keys().forEach(item => {
            _headers = _headers.set(item, req.headers.get(item));
        });

        const authReq = req.clone({
            headers: _headers
        });

        return next.handle(authReq).pipe(
            catchError((err: HttpErrorResponse) => {
                this.handleError(err.status);
                throw err;
            })
        );
    }
    handleError(status) {
    }
}
