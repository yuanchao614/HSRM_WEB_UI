import { Subject } from 'rxjs';

const urlMap = {
    login: { url: '/user/login', dataType: 1},
    register: { url: '/user/register', dataType: 1},
    updatePassword: {url: '/user/updatePassword', dataType: 1},
    deleteUser: {url: '/user/deleteUser', dataType: 1},
    getAll: { url: '/getheros', dataType: 1 },
    getById: { url: '/gethero?id=', dataType: 1 },
};


export function wsSend(service: string, param?) {
    const subject = new Subject();
    const client2 = new XMLHttpRequest();
    if (urlMap[service].dataType) {
        param ? client2.open('GET', '/api' + urlMap[service].url + param, true) : client2.open('GET', '/api' + urlMap[service].url, true);
        // client2.open('GET', '/api' + urlMap[service].url + param, true);
        client2.setRequestHeader('Content-Type', 'application/json');
    } else {
        client2.open('POST', '/api' + urlMap[service].url, true);
        client2.setRequestHeader('Content-Type', 'application/json');
    }
    client2.send();
    // tslint:disable-next-line: only-arrow-functions
    client2.onreadystatechange = function() {
        if (client2.readyState === 4) {
            // tslint:disable-next-line: variable-name
            const json_obj = JSON.parse(client2.responseText);
            subject.next(json_obj);
        }
    };
    return subject;
}
