import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {NavComponent} from './layout/nav/nav.component';
import {FooterComponent} from './layout/footer/footer.component';
import {SideNavComponent} from './layout/side-nav/side-nav.component';
import {HomeComponent} from './pages/home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {ClientComponent} from './pages/client/client.component';
import {EditClientComponent} from './pages/client/edit-client/edit-client.component';
import {CreateClientComponent} from './pages/client/create-client/create-client.component';
import {UserComponent} from './pages/user/user.component';
import {EditUserComponent} from './pages/user/edit-user/edit-user.component';
import {CreateUserComponent} from './pages/user/create-user/create-user.component';
import {LogoutComponent} from './pages/logout/logout.component';
import {CallbackComponent} from './security/callback/callback.component';
import {ScopeComponent} from './pages/scope/scope.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {ServiceModule} from './service/service.module';
import {EditScopeComponent} from './pages/scope/edit-scope/edit-scope.component';
import {FormsModule} from '@angular/forms';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {AddScopeDialogComponent} from './pages/client/add-scope-dialog/add-scope-dialog.component';
import {AuditComponent} from './pages/audit/audit.component';
import {AuditDetailComponent} from './pages/audit/audit-detail/audit-detail.component';
import {MaterialImportModule} from './material-import/material-import.module';
import {OAuthModule} from 'angular-oauth2-oidc';
import {DetailUserComponent} from './pages/user/detail-user/detail-user.component';
import {ListUserComponent} from './pages/user/list-user/list-user.component';
import {DisplayElementComponent} from './layout/display-element/display-element.component';
import {NavigationComponent} from './layout/navigation/navigation.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ListClientComponent } from './pages/client/list-client/list-client.component';
import { DetailClientComponent } from './pages/client/detail-client/detail-client.component';
import { ListScopeComponent } from './pages/scope/list-scope/list-scope.component';
import { DetailScopeComponent } from './pages/scope/detail-scope/detail-scope.component';
import { CreateScopeComponent } from './pages/scope/create-scope/create-scope.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    SideNavComponent,
    HomeComponent,
    ClientComponent,
    EditClientComponent,
    CreateClientComponent,
    UserComponent,
    EditUserComponent,
    CreateUserComponent,
    LogoutComponent,
    CallbackComponent,
    ScopeComponent,
    PageNotFoundComponent,
    EditScopeComponent,
    ConfirmDialogComponent,
    AddScopeDialogComponent,
    AuditComponent,
    AuditDetailComponent,
    DetailUserComponent,
    ListUserComponent,
    DisplayElementComponent,
    NavigationComponent,
    ChangePasswordComponent,
    ListClientComponent,
    DetailClientComponent,
    ListScopeComponent,
    DetailScopeComponent,
    CreateScopeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialImportModule,
    ServiceModule,
    FlexLayoutModule,
    FormsModule,
    OAuthModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [EditScopeComponent, ConfirmDialogComponent, AddScopeDialogComponent, AuditDetailComponent]
})
export class AppModule {
}
