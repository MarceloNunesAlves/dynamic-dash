import { Http, Headers, Response } from '@angular/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { WidgetComponent } from '../widget/widget.component';
import { Dashboard } from './dash.clazz';

@Injectable()
export class WidgetService {

    http: Http;
    headers: Headers;
    url = 'http://localhost:9000/widget/';

    constructor(http: Http) {
        this.http = http;
        this.headers = new Headers();
        this.headers.append('content-type', 'application/json');
        this.headers.append('Access-Control-Allow-Origin', '*');
        this.headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
        this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
    }

    get(id: number): Observable<WidgetComponent> {
        return this.http.get(this.url + id, { headers : this.headers }).map(res => res.json());
    }

    list(): Observable<Array<WidgetComponent>> {
        return this.http.get(this.url + 'list/', { headers : this.headers }).map(res => res.json());
    }

    post(widget: WidgetComponent): Observable<WidgetComponent> {
        return this.http.post(this.url, widget, { headers : this.headers }).map(res => {
            return res.json();
        });
    }
}