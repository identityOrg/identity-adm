import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  activeUserName: string;

  constructor() {
  }

  ngOnInit() {
  }

  subscribeUsername(event) {
    if (event.activeUser) {
      event.activeUser.subscribe(username => {
        this.activeUserName = username;
      });
    }
  }

  unSubscribeUsername() {
    this.activeUserName = null;
  }
}
