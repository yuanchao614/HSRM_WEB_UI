import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})

export class SystemService {
    time = {
        date: '',
        time: ''
    };
    timeSetTimer: any = null;
    constructor() { }

    updateTime() {
        moment.locale();
        this.time.date = moment().format('dddd D MMMM YYYY');
        this.time.time = moment().format('k:mm:ss');
    }

    timeSet() {
        this.updateTime();
        if (!this.timeSetTimer) {
            this.timeSetTimer = setInterval(() => this.updateTime(), 500);
        }
    }
}
