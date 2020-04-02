import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {UserService} from './user.service';
import {ClientService} from './client.service';
import {ScopeService} from './scope.service';
import {AuditService} from './audit.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [],
  declarations: [],
  providers: [UserService, ClientService, ScopeService, AuditService]
})
export class ServiceModule {
}
