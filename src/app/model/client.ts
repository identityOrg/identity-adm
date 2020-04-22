import {ClientMetadata} from './client-metadata';

export interface Client {
  clientId: string;
  status: string;
  creationDate: Date;
  expiryDate: Date;
  clientMetadata: ClientMetadata;
  [prop: string]: any;
}
