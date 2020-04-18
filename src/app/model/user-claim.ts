import {Address} from './address';

export interface UserClaim {
  address: Address;

  [prop: string]: any;
}
