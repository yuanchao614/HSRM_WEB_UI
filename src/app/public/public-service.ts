import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class PublicService {
    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    // getUser() {
    //     return wsSend('users');
    // }
    // getLine() {
    //     return wsSend('getLine');
    // }

    getUser(): Observable<any> {
        const url = `/api/user/allUsers`;
        return this.http.get<any>(`${url}`);
    }

    getLine(): Observable<any> {
        const url = `/api/lineManagement/getLine`;
        return this.http.get<any>(`${url}`);
    }

    getRail(): Observable<any> {
        const url = `/api/highSpeedRailManagement/getHighSpeedRail`;
        return this.http.get<any>(`${url}`);
    }
}
