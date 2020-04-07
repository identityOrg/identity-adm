import {Component, OnInit} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {environment} from '../environments/environment';
import {MediaObserver} from '@angular/flex-layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private oAuthService: OAuthService, private mediaObserver: MediaObserver) {
  }

  ngOnInit(): void {
    this.oAuthService.configure(environment.oidcConfig);
    this.oAuthService.loadDiscoveryDocumentAndTryLogin()
      .then(() => {
      });

    this.mediaObserver.asObservable()
      .subscribe(value => {
        value.forEach(mc => {
          if (environment.logMedia) {
            console.log(mc.mqAlias);
          }
        });
      });
  }
}
