import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { wsSend } from '../../public/until/webServe';
import { from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class HomeService {
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

    getTickets(): Observable<any> {
        const url = `/api/highSpeedTicketsManagement/queryAllTickets`;
        return this.http.get<any>(`${url}`);
    }

    getHighSpeedRail(): Observable<any> {
        const url = `/api/highSpeedRailManagement/getHighSpeedRail`;
        return this.http.get<any>(`${url}`);
    }
}
