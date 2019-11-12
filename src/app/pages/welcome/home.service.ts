import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { wsSend } from '../../public/until/webServe';
import { from } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HomeService {
    constructor(
        private router: Router
    ) { }

    getUser() {
        return wsSend('users');
    }
    getLine() {
        return wsSend('getLine');
    }
}
