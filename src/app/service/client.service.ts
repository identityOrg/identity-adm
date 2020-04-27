import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from '../model/client';
import {OAuthService} from 'angular-oauth2-oidc';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DiscoveryDocument} from '../model/discovery-document';

@Injectable()
export class ClientService {

  constructor(private http: HttpClient,
              private oAuthService: OAuthService,
              private formBuilder: FormBuilder) {
  }

  listClients(criteria: Client): Observable<Client[]> {
    const param = new HttpParams();
    if (criteria) {
      if (criteria.clientId) {
        param.set('clientId', criteria.clientId);
      }
      if (criteria.status) {
        param.set('status', criteria.status);
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

  getDiscoveryDocument(): Observable<DiscoveryDocument> {
    return this.http.get<DiscoveryDocument>(environment.oidcConfig.issuer + '/.well-known/openid-configuration', {
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

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      clientId: this.formBuilder.control('', Validators.required),
      status: this.formBuilder.control('', Validators.required),
      creationDate: this.formBuilder.control(''),
      expiryDate: this.formBuilder.control(''),
      clientMetadata: this.formBuilder.group({
        client_name: this.formBuilder.control('', Validators.required),
        grant_types: this.formBuilder.control(null, Validators.required),
        jwks: this.formBuilder.control(null),
        jwks_uri: this.formBuilder.control(null),
        application_type: this.formBuilder.control(''),
        subject_type: this.formBuilder.control(''),
        scope: this.formBuilder.control(''),
        contacts: this.formBuilder.array([]),
        logo_uri: this.formBuilder.control(''),
        client_uri: this.formBuilder.control(''),
        policy_uri: this.formBuilder.control(''),
        tos_uri: this.formBuilder.control(''),
        redirect_uris: this.formBuilder.array([null], Validators.required),
        request_uris: this.formBuilder.array([]),
        response_types: this.formBuilder.control(null),
        request_object_signing_alg: this.formBuilder.control(null),
        request_object_encryption_alg: this.formBuilder.control(null),
        request_object_encryption_enc: this.formBuilder.control(null),
        id_token_encrypted_response_enc: this.formBuilder.control(null),
        id_token_encrypted_response_alg: this.formBuilder.control(null),
        id_token_signed_response_alg: this.formBuilder.control(null),
        userinfo_signed_response_alg: this.formBuilder.control(null),
        userinfo_encrypted_response_alg: this.formBuilder.control(null),
        userinfo_encrypted_response_enc: this.formBuilder.control(null),
        access_token_validity_minute: this.formBuilder.control(''),
        refresh_token_validity_minute: this.formBuilder.control(''),
        default_max_age: this.formBuilder.control(null),
        require_auth_time: this.formBuilder.control(false),
        token_endpoint_auth_method: this.formBuilder.control(null),
        token_endpoint_auth_signing_alg: this.formBuilder.control(null),
        introspection_endpoint_auth_method: this.formBuilder.control(null),
        introspection_endpoint_auth_signing_alg: this.formBuilder.control(null),
        revocation_endpoint_auth_method: this.formBuilder.control(null),
        revocation_endpoint_auth_signing_alg: this.formBuilder.control(null),
      }),
    });
  }
}
