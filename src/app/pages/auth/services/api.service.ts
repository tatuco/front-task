import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = `${ environment.api.url }:${ environment.api.port }/api`;
  httpOptions: any = {headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`})};
  constructor(public http: HttpClient) {
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    // if (!reqOpts) {
    //   reqOpts = {
    //     params: new HttpParams()
    //   };
    // }
    //
    // if (params) {
    //   reqOpts.params = new HttpParams();
    //   for (const k in params) {
    //     if (params.hasOwnProperty(k)) {
    //       reqOpts.params = reqOpts.params.set(k, params[k]);
    //     }
    //   }
    // }

    return this.http.get(this.url + '/' + endpoint, this.httpOptions);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts)
  }
}
