import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class LoginService {
	constructor(
		private router: Router,
    ) {}
    

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
}