import { Http, Headers, Response } from '@angular/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { WidgetComponent } from '../widget/widget.component';
import { Dashboard } from './dash.clazz';

@Injectable()
export class DashboardService {

    http: Http;
    headers: Headers;
    url = 'http://localhost:9000/dashboard/';

    constructor(http: Http) {
        this.http = http;
        this.headers = new Headers();
        this.headers.append('content-type', 'application/json');
        this.headers.append('Access-Control-Allow-Origin', '*');
        this.headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
        this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
    }

    get(id: number): Observable<Dashboard> {
        return this.http.get(this.url + id, { headers : this.headers }).map(res => res.json());
    }

    list(): Observable<Array<Dashboard>> {
        return this.http.get(this.url + 'list/', { headers : this.headers }).map(res => res.json());
    }

    post(dashboard: Dashboard): Observable<Dashboard> {
        return this.http.post(this.url, dashboard, { headers : this.headers }).map(res => {
            return res.json();
        });
    }

    delete(dashboard: Dashboard): Observable<any> {
        return this.http.delete(this.url + dashboard.id, { headers : this.headers });
    }

}
