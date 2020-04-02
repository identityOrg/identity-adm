import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from '../model/client';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable()
export class ClientService {

  constructor(private http: HttpClient, private oAuthService: OAuthService) {
  }

  listClients(criteria: Client): Observable<Client[]> {
    const param = new HttpParams();
    if (criteria) {
      if (criteria.clientId) {
        param.set('clientId', criteria.clientId);
      }
      if (criteria.clientName) {
        param.set('clientName', criteria.clientName);
      }
      if (criteria.status) {
        param.set('status', criteria.status);
      }
      if (criteria.redirectUri) {
        param.set('admin', criteria.redirectUri);
      }
    }
    return this.http.get<Client[]>(environment.apiBase + '/api/client',
      {
        headers: {
          Authorization: this.oAuthService.authorizationHeader(),
        },
        params: param,
        observe: 'body'
      });
  }

  getClient(clientId: string): Observable<Client> {
    return this.http.get<Client>(environment.apiBase + '/api/client/' + clientId, {
      headers: {
        Authorization: this.oAuthService.authorizationHeader(),
      },
      observe: 'body'
    });
  }

  edit(client: Client): Observable<Client> {
    return this.http.put<Client>(environment.apiBase + '/api/client/' + client.clientId, client, {
      headers: {
        Authorization: this.oAuthService.authorizationHeader(),
      },
      observe: 'body'
    });
  }

  lock(clientId: string): Observable<Client> {
    return this.http.post<Client>(environment.apiBase + '/api/client/' + clientId + '/status',
      {status: 'LOCKED'},
      {
        headers: {
          Authorization: this.oAuthService.authorizationHeader(),
        },
        observe: 'body'
      });
  }

  enable(clientId: string): Observable<Client> {
    return this.http.post<Client>(environment.apiBase + '/api/client/' + clientId + '/status',
      {status: 'ACTIVE'},
      {
        headers: {
          Authorization: this.oAuthService.authorizationHeader(),
        },
        observe: 'body'
      });
  }

  create(client: Client): Observable<Client> {
    return this.http.post<Client>(environment.apiBase + '/api/client',
      client,
      {
        headers: {
          Authorization: this.oAuthService.authorizationHeader(),
        },
        observe: 'body'
      });
  }
}
