import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable, of} from 'rxjs';
import {Statistics, Users} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {
  }

  fetch(params: any = {}): Observable<Users[]> {
    // return this.http.get<Users[]>(`/api/v1/users`, {
    //   params: new HttpParams({
    //     fromObject: params
    //   })
    // });
    return  of(JSON.parse('{"content": [' +
      '{"id":1,"firstName": "Lara","lastName": "Kra","email": "mail","gender": "men","totalClicks": 1235,"totalPageViews": 57, "ipAddress": "57.13.44"},' +
      '{"id":2,"firstName": "Sara","lastName": "Pra","email": "mail","gender": "men","totalClicks": 1235,"totalPageViews": 57, "ipAddress": "57.13.44"}' +
      '],' +
      '"totalPages": 100,"totalElements": 200}')
    )
  }
  fetchById(id: string): Observable<Users> {
    // return this.http.get<Users>(`/api/v1/users/${id}`)
    return of(JSON.parse('{"content": [{"id":1,"firstName": "SomeName","lastName": "SomeLastName","email": "mail","gender": "man","totalClicks": 1235,"totalPageViews": 57, "ipAddress": "57.13.44"}],' +
      '"totalPages": 100,"totalElements": 200}'))
  }

  getStatistics(params: any = {}): Observable<Statistics> {
    // return this.http.get<Statistics>(`/api/v1/users/statistic`, {
    //   params: new HttpParams({
    //     fromObject: params
    //   })
    // })
    return of(
      JSON.parse('{"chart":[{"id": 1, "page_views":260, "date":"2019-10-02T00:00:00.000+0000", "clicks": 565, "userId": 33},' +
        '{"id": 2, "page_views":220, "date":"2019-10-05T00:00:00.000+0000", "clicks": 50, "userId": 33},' +
        '{"id": 3, "page_views":250, "date":"2019-10-07T00:00:00.000+0000", "clicks": 300, "userId": 33}]}')
    )
  }
}
