import {Component, OnInit} from '@angular/core';
import {Client} from '../../model/client';
import {MatDialog} from '@angular/material/dialog';
import {CreateClientComponent} from './create-client/create-client.component';
import {ClientService} from '../../service/client.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  activeClient: Client;

  constructor(private matDialog: MatDialog,
              private clientService: ClientService,
              private router: Router) {
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

  createClient() {
    this.matDialog.open(CreateClientComponent)
      .afterClosed().subscribe(value => {
      if (value) {
        this.clientService.create(value)
          .subscribe(client => {
            this.router.navigateByUrl('/client/edit/' + client.clientId).then(() => {
            });
          });
      }
    });
  }
}
