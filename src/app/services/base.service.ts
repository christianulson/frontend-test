import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export abstract class BaseService<T> {
  static baseUrl: string = 'colocar url do serviço de produção';
  static baseMockUrl: string = 'assets/mocks/';


  ///Mudar aqui para mocar ou não
  static mock: boolean = true;

  constructor(public http: Http) {

  }

  protected getBy(url: string): Observable<T> {
    /// <sumary>
    /// ex. url: route
    /// ex. mockfilename: route.json
    /// </sumary>
    if (BaseService.mock) {
      console.log('By/GET----------------');
      console.log('url:' + url);
      console.log('mock:' + this.mockUrl(url) + '.json');
      console.log('By/GET END ----------------');
      return this.get(this.mockUrl(url) + '.json');
    }
    return this.get(`${url}`);
  }

  protected get(url): Observable<any> {
    console.log(`Get url:${(BaseService.mock
      ? BaseService.baseMockUrl
      : BaseService.baseUrl) + url}`);
    return this.http.get(
      (BaseService.mock ? BaseService.baseMockUrl : BaseService.baseUrl) + url,
      { headers: this.getHeaders() })
      .map(this.extractData)
      .catch(r => this.handleError(r, this));
  }

  protected getHeaders(): Headers {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }

  protected mockUrl(url: string): string {
    while (url.indexOf('/') > -1)
      url = url.replace('/', '');
    for (let i = 0; i < 5; i++) {
      while (url.indexOf('{' + i + '}') > -1)
        url = url.replace('{' + i + '}', '.' + i);
    }
    return url;
  }

  private extractData(res: Response): any {
    let body = res.json();
    if (body.error) return body;
    return body || {};
  }

  private handleError(error, that): Observable<any> {
    console.log(`error:${error}`);
    let errMsg = (error.text)
      ? error.text
      : error.status
        ? `${error.status} - ${error.statusText}`
        : 'Server error';
    return Observable.throw(errMsg);
  }
}
