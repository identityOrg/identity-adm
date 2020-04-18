import {Component, OnInit} from '@angular/core';
import {Client} from '../../model/client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  activeClient: Client;

  constructor() {
  }

  ngOnInit() {
  }

  subscribeClient(event: any) {
    if (event.clientObserver) {
      event.clientObserver
        .subscribe(cl => {
          this.activeClient = cl;
        });
    }
  }

  unSubscribeClient() {
    this.activeClient = null;
  }
}
