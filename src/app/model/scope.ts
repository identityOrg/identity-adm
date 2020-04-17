import {Claim} from './claim';

export interface Scope {
  scopeId: string;
  scopeName: string;
  custom: boolean;
  attachedClaims: Claim[];
}
