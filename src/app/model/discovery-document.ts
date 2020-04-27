export interface DiscoveryDocument {
  grant_types_supported: string[];
  response_types_supported: string[];

  id_token_encryption_alg_values_supported: string[];
  id_token_encryption_enc_values_supported: string[];
  id_token_signing_alg_values_supported: string[];

  userinfo_signing_alg_values_supported: string[];
  userinfo_encryption_alg_values_supported: string[];
  userinfo_encryption_enc_values_supported: string[];

  request_object_signing_alg_values_supported: string[];
  request_object_encryption_alg_values_supported: string[];
  request_object_encryption_enc_values_supported: string[];

  token_endpoint_auth_methods_supported: string[];
  token_endpoint_auth_signing_alg_values_supported: string[];
  introspection_endpoint_auth_methods_supported: string[];
  introspection_endpoint_auth_signing_alg_values_supported: string[];
  revocation_endpoint_auth_methods_supported: string[];
  revocation_endpoint_auth_signing_alg_values_supported: string[];

  [prop: string]: any;
}
