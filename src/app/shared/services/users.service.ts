import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {from, Observable, of} from 'rxjs';
import {Users} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {
  }

  fetch(params: any = {}): Observable<Users[]> {
    return  of(JSON.parse('{"content": [' +
      '{"id":1,"firstName": "Kri","lastName": "Kra","email": "mail","gender": "men","totalClicks": 1235,"totalPageViews": 57, "ipAddress": "57.13.44"},' +
      '{"id":2,"firstName": "Kri","lastName": "Kra","email": "mail","gender": "men","totalClicks": 1235,"totalPageViews": 57, "ipAddress": "57.13.44"}' +
      '],' +
      '"totalPages": 100,"totalElements": 200}')
    )

    // return this.http.get<Users[]>(`/api/v1/users`, {
    //   params: new HttpParams({
    //     fromObject: params
    //   })
    // });
  }
}
