import { Subject } from 'rxjs';

const urlMap = {
    getAll: { url: '/getheros', dataType: 1 },
    getById: { url: '/gethero?id=', dataType: 1 },
};


export function wsSend(service: string) {
    const subject = new Subject();
    const client2 = new XMLHttpRequest();
    if (urlMap[service].dataType) {
        client2.open('GET', '/api' + urlMap[service].url, true);
    } else {
        client2.open('POST', '/api' + urlMap[service].url, true);
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
