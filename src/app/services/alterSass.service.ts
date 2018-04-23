import { Http, Headers, Response } from '@angular/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { WidgetComponent } from '../widget/widget.component';
import { Color } from './dash.clazz';
import { environment } from '../../environments/environment';

@Injectable()
export class AlterSassService {

    http: Http;
    headers: Headers;
    url = 'http://' + environment.backend + ':9001/sass/';

    constructor(http: Http) {
        this.http = http;
        this.headers = new Headers();
        this.headers.append('content-type', 'application/json');
        this.headers.append('Access-Control-Allow-Origin', '*');
        this.headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
        this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
    }

    post(color: Color): Observable<Color> {
        return this.http.post(this.url, color, { headers : this.headers }).map(res => {
            return res.json();
        });
    }
}
