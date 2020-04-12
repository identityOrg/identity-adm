import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {OAuthService} from 'angular-oauth2-oidc';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Claim} from '../model/claim';
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  constructor(private http: HttpClient, private oAuthService: OAuthService) {
  }

  listClaims(criteria: Claim): Observable<Claim[]> {
    let param = new HttpParams();
    if (criteria) {
      if (criteria.custom) {
        param = param.append('custom', criteria.custom.toString());
      }
      if (criteria.claimType) {
        param = param.append('claimType', criteria.claimType);
      }
      if (criteria.standardAttribute) {
        param = param.append('standardAttribute', criteria.standardAttribute);
      }
    }
    return this.http.get<Claim[]>(environment.apiBase + '/api/claim', {
      headers: {
        Authorization: this.oAuthService.authorizationHeader(),
      },
      params: param,
      observe: 'body'
    });
  }

  getClaim(claimId: string): Observable<Claim> {
    return this.http.get<Claim>(environment.apiBase + '/api/claim/' + claimId, {
      headers: {
        Authorization: this.oAuthService.authorizationHeader(),
      },
      observe: 'body'
    });
  }
}
