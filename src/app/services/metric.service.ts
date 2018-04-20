import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Metric, DetailChart, ValueSerie } from './flex4.clazz';
import { environment } from '../../environments/environment';

@Injectable()
export class MetricService {

    http: Http;
    headers: Headers;
    url = 'http://' + environment.backend + '/metric/';

    constructor(http: Http) {
        this.http = http;
        this.headers = new Headers();
        this.headers.append('content-type', 'application/json');
        this.headers.append('Access-Control-Allow-Origin', '*');
        this.headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
        this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
    }

    lista(): Observable<Metric[]> {
        return this.http.get(this.url + 'listMetricWithType/', { headers : this.headers }).map(res => res.json());
    }

    values(metrics: Metric[]): Observable<DetailChart[]> {
        return this.http.post(this.url + 'listSerie/', metrics, { headers : this.headers }).map(res => {
            let item: any[] = res.json();
            let listReturn: DetailChart[] = [];
            item.forEach(element => {
                listReturn.push(element as DetailChart);
            });
            return listReturn;
        });
    }
}
