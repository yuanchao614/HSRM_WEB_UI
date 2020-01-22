import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { wsSend } from '../../public/until/webServe';
import { from } from 'rxjs';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    getUser() {
        return wsSend('users');
    }

    //    addUser(data) {
    //        return wsSend('register', data);
    //    }

    // deleteUser(data) {
    //     return wsSend('deleteUser', data);
    // }

    // updatePassword(data) {
    //     return wsSend('updatePassword', data);
    // }

    // operatorRecord(data) {
    //     return wsSend('userOperator', data);
    // }

    getOperatorRecords() {
        return wsSend('getUserOperators');
    }

    addUser(param): Observable<any> {
        const url = `/api/user/register`;
        return this.http.post<any>(`${url}`, param);
    }

    deleteUser(param) {
        const url = `/api/user/deleteUser`;
        return this.http.get<any>(`${url}?name=${param.name}`);
    }

    updatePassword(param) {
        const url = `/api/user/updatePassword`;
        return this.http.post<any>(`${url}?username=${param.username}&oldPassword=${param.oldPassword}`, param);
    }

    operatorlog(param) {
        const url = `/api/user/operator`;
        return this.http.post<any>(`${url}`, param);
    }

    deleteOperator(param): Observable<any>  {
        const url = `/api/user/deleOperator`;
        return this.http.get<any>(`${url}?id=${param.id}`);
    }

    uploadImg(param): Observable<any> {
        const url = `/api/user/uploadImg`;
        return this.http.post<any>(`${url}`, param);
    }
}
