import {Component, OnInit} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private oAuthService: OAuthService) {
  }

  ngOnInit() {
  }

  loginAgain() {
    this.oAuthService.initLoginFlow();
    return false;
  }

}
