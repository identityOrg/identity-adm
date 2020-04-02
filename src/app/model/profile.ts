import {Authority} from './authority';

export interface Profile {
  username: string;
  status: string;
  creationDate: Date;
  passwordExpiryDate: Date;
  admin: boolean;
  authorities: Authority[];
}
