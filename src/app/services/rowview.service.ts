import { Http, Headers, Response } from '@angular/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { WidgetComponent } from '../widget/widget.component';
import { Dashboard, RowView } from './dash.clazz';
import { environment } from '../../environments/environment';

@Injectable()
export class RowViewService {

    http: Http;
    headers: Headers;
    url = 'http://' + environment.backend + '/rowView/';

    constructor(http: Http) {
        this.http = http;
        this.headers = new Headers();
        this.headers.append('content-type', 'application/json');
        this.headers.append('Access-Control-Allow-Origin', '*');
        this.headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
        this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
    }

    get(id: number): Observable<RowView> {
        return this.http.get(this.url + id, { headers : this.headers }).map(res => res.json());
    }

    listByDashboard(dashboard: Dashboard): Observable<Array<RowView>> {
        return this.http.post(this.url + 'listByDashboard/', dashboard, { headers : this.headers }).map(res => res.json());
    }

    post(rowView: RowView): Observable<RowView> {
        return this.http.post(this.url, rowView, { headers : this.headers }).map(res => {
            return res.json();
        });
    }

    delete(rowView: RowView): void {
        this.http.delete(this.url + rowView.id, { headers : this.headers });
    }

}
