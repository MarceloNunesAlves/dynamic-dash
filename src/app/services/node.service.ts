import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubItem, Metric } from './flex4.clazz';

@Injectable()
export class NodeService {

    http: Http;
    headers: Headers;
    url = 'http://localhost:9000/node/';

    constructor(http: Http) {
        this.http = http;
        this.headers = new Headers();
        this.headers.append('content-type', 'application/json');
        this.headers.append('Access-Control-Allow-Origin', '*');
        this.headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
        this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
    }

    listaByFilter(metric): Observable<SubItem[]> {
        return this.http.post(this.url + 'listNodes/', metric, { headers : this.headers }).map(res => res.json());
    }
}
