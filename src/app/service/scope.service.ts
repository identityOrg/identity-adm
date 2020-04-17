import {Injectable} from '@angular/core';
import {Scope} from '../model/scope';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {OAuthService} from 'angular-oauth2-oidc';

@Injectable()
export class ScopeService {

  constructor(private http: HttpClient, private oAuthService: OAuthService) {
  }

  listScopes(criteria: Scope): Observable<Scope[]> {
    const param = new HttpParams();
    if (criteria) {
      if (criteria.scopeId) {
        param.set('scopeId', criteria.scopeId);
      }
      if (criteria.scopeName) {
        param.set('scopeName', criteria.scopeName);
      }
    }
    return this.http.get<Scope[]>(environment.apiBase + '/api/scope',
      {
        headers: {
          Authorization: this.oAuthService.authorizationHeader(),
        },
        params: param,
        observe: 'body'
      });
  }

  getScope(scopeId: string): Observable<Scope> {
    return this.http.get<Scope>(environment.apiBase + '/api/scope/' + scopeId, {
      headers: {
        Authorization: this.oAuthService.authorizationHeader(),
      },
      observe: 'body'
    });
  }

  update(scope: Scope): Observable<Scope> {
    return this.http.put<Scope>(environment.apiBase + '/api/scope/' + scope.scopeId, scope, {
      headers: {
        Authorization: this.oAuthService.authorizationHeader(),
      },
      observe: 'body'
    });
  }

  addClaim(scopeId: string, claimId: string): Observable<Scope> {
    return this.http.patch<Scope>(environment.apiBase + '/api/scope/' + scopeId + '/add-claim/' + claimId, null, {
      headers: {
        Authorization: this.oAuthService.authorizationHeader(),
      },
      observe: 'body'
    });
  }

  removeClaim(scopeId: string, claimId: string): Observable<Scope> {
    return this.http.patch<Scope>(environment.apiBase + '/api/scope/' + scopeId + '/remove-claim/' + claimId, null, {
      headers: {
        Authorization: this.oAuthService.authorizationHeader(),
      },
      observe: 'body'
    });
  }

  create(scope: Scope): Observable<Scope> {
    return this.http.post<Scope>(environment.apiBase + '/api/scope', scope, {
      headers: {
        Authorization: this.oAuthService.authorizationHeader(),
      },
      observe: 'body'
    });
  }
}
