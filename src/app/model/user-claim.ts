import {Address} from './address';

export interface UserClaim {
  [prop: string]: any;

  address: Address;
}
