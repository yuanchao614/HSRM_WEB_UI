import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
// import { ConfigService } from 'app/config/config.service';
// import { USER_API_URL, DEVELOP_LOGIN_GETWAY } from 'app/app.constants';
import { Observable } from 'rxjs';

export const httpOptions: Object = {
    headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        Authorization: 'No Auth'
    })
};
@Injectable({
    providedIn: 'root'
})
export class AuthService {

}
