export interface Audit {
  id: string;
  eventName: string;
  eventTime: Date;
  authType: string;
  displayLevel: number;
  principleName: string;
  principleType: string;
  resourceId: string;
  resourceType: string;
  exceptionName: string;
  exceptionMessage: string;
  remoteIp: string;
  sessionId: string;
  message: string;
}
