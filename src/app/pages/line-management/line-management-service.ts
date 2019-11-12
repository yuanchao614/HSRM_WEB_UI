import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { wsSend } from '../../public/until/webServe';
import { from } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LineManagementService {
    constructor(
        private router: Router
    ) { }

   getLine() {
       return wsSend('getLine');
   }
}
