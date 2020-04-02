export interface Token {
  error: string;
  error_description: string;
  access_token: string;
  token_type: string;
  expires_in: number;
  expiry: Date;
  scope: string;
  state: string;
}
