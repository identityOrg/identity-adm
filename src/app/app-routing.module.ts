import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {LoginGuard} from './security/login.guard';
import {LogoutGuard} from './security/logout.guard';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {CallbackComponent} from './security/callback/callback.component';
import {ScopeComponent} from './pages/scope/scope.component';
import {LogoutComponent} from './pages/logout/logout.component';
import {EditUserComponent} from './pages/user/edit-user/edit-user.component';
import {CreateUserComponent} from './pages/user/create-user/create-user.component';
import {UserComponent} from './pages/user/user.component';
import {EditClientComponent} from './pages/client/edit-client/edit-client.component';
import {CreateClientComponent} from './pages/client/create-client/create-client.component';
import {ClientComponent} from './pages/client/client.component';
import {AuditComponent} from './pages/audit/audit.component';
import {DetailUserComponent} from './pages/user/detail-user/detail-user.component';
import {ListUserComponent} from './pages/user/list-user/list-user.component';
import {ChangePasswordComponent} from './pages/change-password/change-password.component';
import {ListClientComponent} from './pages/client/list-client/list-client.component';
import {DetailClientComponent} from './pages/client/detail-client/detail-client.component';
import {ListScopeComponent} from './pages/scope/list-scope/list-scope.component';
import {EditScopeComponent} from './pages/scope/edit-scope/edit-scope.component';
import {DetailScopeComponent} from './pages/scope/detail-scope/detail-scope.component';
import {CreateScopeComponent} from './pages/scope/create-scope/create-scope.component';
import {ClaimComponent} from "./pages/claim/claim.component";
import {ListClaimComponent} from "./pages/claim/list-claim/list-claim.component";
import {CreateClaimComponent} from "./pages/claim/create-claim/create-claim.component";
import {EditClaimComponent} from "./pages/claim/edit-claim/edit-claim.component";
import {DetailClaimComponent} from "./pages/claim/detail-claim/detail-claim.component";

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: HomeComponent, canActivate: [LoginGuard]},
  {
    path: 'client', component: ClientComponent, children: [
      {path: '', pathMatch: 'full', component: ListClientComponent, canActivate: [LoginGuard]},
      {path: 'create', component: CreateClientComponent, canActivate: [LoginGuard]},
      {path: 'edit/:clientId', component: EditClientComponent, canActivate: [LoginGuard]},
      {path: 'detail/:clientId', component: DetailClientComponent, canActivate: [LoginGuard]}
    ]
  },
  {
    path: 'user', component: UserComponent, children: [
      {path: '', pathMatch: 'full', component: ListUserComponent, canActivate: [LoginGuard]},
      {path: 'create', component: CreateUserComponent, canActivate: [LoginGuard]},
      {path: 'edit/:username', component: EditUserComponent, canActivate: [LoginGuard]},
      {path: 'detail/:username', component: DetailUserComponent, canActivate: [LoginGuard]}
    ]
  },
  {
    path: 'scope', component: ScopeComponent, children: [
      {path: '', pathMatch: 'full', component: ListScopeComponent, canActivate: [LoginGuard]},
      {path: 'create', component: CreateScopeComponent, canActivate: [LoginGuard]},
      {path: 'edit/:scopeId', component: EditScopeComponent, canActivate: [LoginGuard]},
      {path: 'detail/:scopeId', component: DetailScopeComponent, canActivate: [LoginGuard]}
    ]
  },
  {
    path: 'claim', component: ClaimComponent, children: [
      {path: '', pathMatch: 'full', component: ListClaimComponent, canActivate: [LoginGuard]},
      {path: 'create', component: CreateClaimComponent, canActivate: [LoginGuard]},
      {path: 'edit/:claimId', component: EditClaimComponent, canActivate: [LoginGuard]},
      {path: 'detail/:claimId', component: DetailClaimComponent, canActivate: [LoginGuard]}
    ]
  },
  {path: 'audit', component: AuditComponent, canActivate: [LoginGuard]},
  {path: 'change-password', component: ChangePasswordComponent, canActivate: [LoginGuard]},
  {path: 'logout', component: LogoutComponent, canActivate: [LogoutGuard]},
  {path: 'callback', component: CallbackComponent},
  {path: '**', component: PageNotFoundComponent, canActivate: [LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoginGuard, LogoutGuard]
})
export class AppRoutingModule {
}
