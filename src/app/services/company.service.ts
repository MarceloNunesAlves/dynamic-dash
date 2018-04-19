import { Http, Headers, Response } from '@angular/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { WidgetComponent } from '../widget/widget.component';
import { Company } from './dash.clazz';

@Injectable()
export class CompanyService {

    http: Http;
    headers: Headers;
    url = 'http://localhost:9000/company/';

    constructor(http: Http) {
        this.http = http;
        this.headers = new Headers();
        this.headers.append('content-type', 'application/json');
        this.headers.append('Access-Control-Allow-Origin', '*');
        this.headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
        this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
    }

    get(id: number): Observable<Company> {
        return this.http.get(this.url + id, { headers : this.headers }).map(res => res.json());
    }

    list(): Observable<Array<Company>> {
        return this.http.get(this.url + 'list/', { headers : this.headers }).map(res => res.json());
    }

    post(company: Company): Observable<Company> {
        return this.http.post(this.url, company, { headers : this.headers }).map(res => {
            return res.json();
        });
    }
}