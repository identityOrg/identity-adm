import {Component, OnInit} from '@angular/core';
import {Client} from '../../model/client';
import {MatDialog} from '@angular/material/dialog';
import {CreateClientComponent} from './create-client/create-client.component';
import {ClientService} from '../../service/client.service';
import {Router} from '@angular/router';
import {ConfirmDialogComponent} from '../../confirm-dialog/confirm-dialog.component';

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

  lockClient() {
    this.matDialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Please Confirm',
        confirmation: 'Do you want to lock the client ' + this.activeClient.clientMetadata.client_name + '?'
      }
    })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.clientService.lock(this.activeClient.clientId)
            .subscribe(data => {
              this.activeClient = data;
            });
        }
      });
    return false;
  }

  enableClient() {
    this.matDialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Please Confirm',
        confirmation: 'Do you want to enable the client ' + this.activeClient.clientMetadata.client_name + '?'
      }
    })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.clientService.enable(this.activeClient.clientId)
            .subscribe(data => {
              this.activeClient = data;
            });
        }
      });
    return false;
  }
}
