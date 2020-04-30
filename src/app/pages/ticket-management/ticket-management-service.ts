import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { wsSend } from '../../public/until/webServe';
import { from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';



@Injectable({
    providedIn: 'root'
})
export class TicketManagementService {
    // tslint:disable-next-line: variable-name
    // private apiUrl_custip_online = 'http://localhost:3000';
    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    // getLine() {
    //     return wsSend('getLine');
    // }

    // 请求不需要前面的IP地址因为在proxy里面已经配置会自动转发
    // 获取全部线路信息
    getTickets(): Observable<any> {
        const url = `/api/highSpeedTicketsManagement/queryAllTickets`;
        return this.http.get<any>(`${url}`);
    }

    // 根据车票编号删除
    deleteTicketById(param): Observable<any> {
        const url = `/api/highSpeedTicketsManagement/deleteTicket`;
        return this.http.get<any>(`${url}/?id=${param.id}`);
    }

    // 新增高铁车票信息
    addTicket(param): Observable<any> {
        const url = `/api/highSpeedTicketsManagement/addTicket`;
        return this.http.post<any>(`${url}`, param);
    }

     // 修改高铁车票信息
     updateTicket(param): Observable<any> {
        const url = `/api/highSpeedTicketsManagement/updateTicket`;
        return this.http.post<any>(`${url}`, param);
    }

     // type  0:转换为时间戳， 1:转换为显示时间
     changeDate(dates, type: 0 | 1, isTime = false) {
        if (!dates) {
            return null;
        }
        let dated;
        switch (type) {
            case 0: {
                dated = new Date(dates).getTime();
                break;
            }
            case 1: {
                const temp = new Date(dates);
                const year = temp.getFullYear();
                const month = temp.getMonth() + 1 >= 10 ? temp.getMonth() + 1 : '0' + (temp.getMonth() + 1);
                const day = temp.getDate() >= 10 ? temp.getDate() : '0' + temp.getDate();
                const hours = temp.getHours() >= 10 ? temp.getHours() : '0' + temp.getHours();
                const min = temp.getMinutes() >= 10 ? temp.getMinutes() : '0' + temp.getMinutes();
                const seconds = temp.getSeconds() >= 10 ? temp.getSeconds() : '0' + temp.getSeconds();
                // tslint:disable-next-line: max-line-length
                // dated = temp.getFullYear() + '-' + (temp.getMonth() + 1) + '-' + temp.getDate() + ' ' + temp.getHours() + ':' + temp.getMinutes();
                if (isTime) {
                    dated = day + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + seconds;
                } else {
                    dated = day + '/' + month + '/' + year;
                }
                break;
            }
        }
        return dated;
    }
}
