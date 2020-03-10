import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { wsSend } from '../public/until/webServe';
import { from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class LoginService {
	constructor(
		private router: Router,
		private http: HttpClient
	) { }


    /**
     * check token
     */
	autoAccessToken() {
		// 还要判断这个token 过期没有
		if (!localStorage.getItem('access_token')) {
			this.logInCheck();
			return false;
		}
		return true;
	}

    /**
     * return access_token
     */
	getAccessToken() {
		this.autoAccessToken();
		return localStorage.getItem('access_token');
	}

	logInCheck() {
		this.router.navigate(['/login']);
	}

	/**
     * 登出
     */
	logOut() {
		const token = localStorage.getItem('token');
		if (token) {
			this.removeLocalStorage();
		}
	}

	removeLocalStorage() {
		localStorage.removeItem('user_id');
		localStorage.removeItem('role_id');
		localStorage.removeItem('token');
	}

	// logIn(data) {
	// 	return wsSend('login', data);
	// }


	logIn(param): Observable<any> {
		const url = `/api/user/login`;
		return this.http.post<any>(`${url}`, param);
	}

}