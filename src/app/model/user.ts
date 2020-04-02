import {UserClaim} from './user-claim';

export interface User {
  username: string;
  active: boolean;
  locked: boolean;
  creationDate: Date;
  expiryDate: Date;
  passwordExpiryDate: Date;
  admin: boolean;
  userClaims: UserClaim;
}
