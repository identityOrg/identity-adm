import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Client} from '../../../model/client';
import {ClientService} from '../../../service/client.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmDialogComponent} from '../../../confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  @Output() clientObserver: EventEmitter<Client> = new EventEmitter();
  client = {} as Client;
  clientForm: FormGroup;

  constructor(private clientService: ClientService,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private matDialog: MatDialog) {
    this.clientForm = clientService.createFormGroup();
  }

  ngOnInit() {
    this.activeRoute.paramMap
      .subscribe(pMap => {
        this.clientService.getClient(pMap.get('clientId'))
          .subscribe(data => {
            this.setClientData(data);
          });
      });
  }

  private setClientData(data) {
    this.client = data;
    this.clientForm.patchValue(data);
    this.clientObserver.emit(data);
  }

  save() {
    this.clientService.edit(this.clientForm.value)
      .subscribe(data => {
        this.setClientData(data);
      });
    return false;
  }

  lockClient(): boolean {
    this.matDialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Please Confirm',
        confirmation: 'Do you want to lock the client ' + this.client.clientMetadata.client_name + '?'
      }
    })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.clientService.lock(this.client.clientId)
            .subscribe(data => {
              this.setClientData(data);
            });
        }
      });
    return false;
  }

  enableClient(): boolean {
    this.matDialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Please Confirm',
        confirmation: 'Do you want to enable the client ' + this.client.clientMetadata.client_name + '?'
      }
    })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.clientService.enable(this.client.clientId)
            .subscribe(data => {
              this.setClientData(data);
            });
        }
      });
    return false;
  }

  resetUser() {
  }
}
