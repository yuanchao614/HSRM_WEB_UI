import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { wsSend } from '../public/until/webServe';
import { from } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LayoutsService {
    constructor(
        private router: Router
    ) { }

    loginOut(param) {
        return wsSend('loginOut', param);
    }
}
