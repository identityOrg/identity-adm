import {Scope} from './scope';
import {Authority} from './authority';

export interface Client {
  clientId: string;
  clientName: string;
  status: string;
  redirectUri: string;
  creationDate: Date;
  expiryDate: Date;
  scopes: Scope[];
  accessTokenValidity: string;
  refreshTokenValidity: string;
  authorities: Authority[];
}
