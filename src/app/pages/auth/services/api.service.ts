import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private readonly http: HttpClient) {
  }

  generateUri(segment: string): string {
    const url = Boolean(localStorage.getItem('token')) ? '' : '';
    return `${environment.api.url}:${environment.api.port}/api/${url}${segment}`;
  }

  get(url: string, params ?: any): Observable<any> {
    return this.http.get(this.generateUri(url), params);
  }

  post(url: string, data: any, params ?: any): Observable<any> {
    return this.http.post(this.generateUri(url), data, params);
  }

  put(url: string, data: any, params ?: any): Observable<any> {
    return this.http.put(this.generateUri(url), data, params);
  }

  delete(url: string, data ?: any): Observable<any> {
    return this.http.delete(this.generateUri(url));
  }
}
