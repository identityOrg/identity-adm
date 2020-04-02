import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {User} from '../model/user';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private oAuthService: OAuthService) {
  }

  listUsers(criteria: User): Observable<User[]> {
    const param = new HttpParams();
    if (criteria) {
      if (criteria.active) {
        param.set('active', criteria.active.toString());
      }
      if (criteria.locked) {
        param.set('locked', criteria.locked.toString());
      }
      if (criteria.admin) {
        param.set('admin', criteria.admin.toString());
      }
      if (criteria.username) {
        param.set('username', criteria.username);
      }
    }
    return this.http.get<User[]>(environment.apiBase + '/api/user', {
      headers: {
        Authorization: this.oAuthService.authorizationHeader(),
      },
      params: param,
      observe: 'body'
    });
  }

  getUser(username: string): Observable<User> {
    return this.http.get<User>(environment.apiBase + '/api/user/' + username, {
      headers: {
        Authorization: this.oAuthService.authorizationHeader(),
      },
      observe: 'body'
    });
  }

  edit(user: User): Observable<User> {
    return this.http.put<User>(environment.apiBase + '/api/user/' + user.username, user, {
      headers: {
        Authorization: this.oAuthService.authorizationHeader(),
      },
      observe: 'body'
    });
  }


  lock(username: string): Observable<User> {
    return this.http.post<User>(environment.apiBase + '/api/user/' + username + '/status',
      {status: 'LOCKED'},
      {
        headers: {
          Authorization: this.oAuthService.authorizationHeader(),
        },
        observe: 'body'
      });
  }

  enable(username: string, password: string): Observable<User> {
    return this.http.post<User>(environment.apiBase + '/api/user/' + username + '/status',
      {
        status: 'ACTIVE',
        password
      },
      {
        headers: {
          Authorization: this.oAuthService.authorizationHeader(),
        },
        observe: 'body'
      });
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(environment.apiBase + '/api/user',
      user,
      {
        headers: {
          Authorization: this.oAuthService.authorizationHeader(),
        },
        observe: 'body'
      });
  }
}
