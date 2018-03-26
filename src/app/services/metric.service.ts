import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Metric, DetailChart, DetailSerie, ValueSerie } from './flex4.clazz';


@Injectable()
export class MetricService {

    http: Http;
    headers: Headers;
    url = 'http://localhost:9000/metric/';

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

    values(metric: Metric): Observable<DetailChart> {
        return this.http.post(this.url + 'listSerie/', metric, { headers : this.headers }).map(res => {
            let item: any[] = res.json();
            let listValues: ValueSerie[] = [];
            item.forEach(element => {
              listValues.push(new ValueSerie(new Date(element.time), element.value));
            });
            return new DetailChart(new DetailSerie(metric.name, metric.unit_type), listValues);
        });
    }
}
