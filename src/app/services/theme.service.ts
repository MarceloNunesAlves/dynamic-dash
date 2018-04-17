import { Http, Headers, Response, ResponseContentType } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubItem, Metric } from './flex4.clazz';

@Injectable()
export class ThemeService {

    http: Http;
    headers: Headers;
    url = 'http://www.mackenzie.br/fileadmin/Graduacao/CCBS/Cursos/Ciencias_Biologicas/1o_2012/Biblioteca_TCC_Lic/2009/2o_Semestre/Karen_e_Priscila.pdf';

    constructor(http: Http) {
        this.http = http;
        this.headers = new Headers();
        this.headers.append('ResponseContentType', 'blob');
        this.headers.append('Access-Control-Allow-Origin', '*');
        this.headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
        this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
    }

    theme(): Observable<any> {
        return this.http.get(this.url, {responseType: ResponseContentType.Blob});
    }
}
