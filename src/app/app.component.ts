import {Component, OnInit} from '@angular/core';
import {MediaObserver} from '@angular/flex-layout';
import {OAuthService} from 'angular-oauth2-oidc';
import {environment} from '../environments/environment';

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
      .then(r => {
        console.log('Login tried ' + r);
        if (r) {
          this.oAuthService.loadUserProfile()
            .then(userInfo => {
              console.log(userInfo);
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    this.mediaObserver.asObservable()
      .subscribe(next => {
        next.forEach(change => {
          console.log(change);
        });
      });
  }
}
