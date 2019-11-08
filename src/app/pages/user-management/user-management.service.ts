import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { wsSend } from '../../public/until/webServe';
import { from } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(
        private router: Router
    ) { }

   getUser() {
       return wsSend('users' );
   }

   addUser(data) {
       return wsSend('register', data);
   }

   deleteUser(data) {
       return wsSend('deleteUser', data);
   }

   updatePassword(data) {
       return wsSend('updatePassword', data);
   }
}
