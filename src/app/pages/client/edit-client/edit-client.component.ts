import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Client} from '../../../model/client';
import {ClientService} from '../../../service/client.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmDialogComponent} from '../../../confirm-dialog/confirm-dialog.component';
import {Scope} from '../../../model/scope';
import {AddScopeDialogComponent} from '../add-scope-dialog/add-scope-dialog.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  @Output() clientObserver: EventEmitter<Client> = new EventEmitter();
  title: string;
  editMode = false;
  client = {} as Client;

  scopeColumns = ['scopeId', 'scopeName', 'actions'];
  scopeDS: MatTableDataSource<Scope> = null;

  constructor(private clientService: ClientService,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private matDialog: MatDialog) {
  }

  ngOnInit() {
    this.activeRoute.paramMap
      .subscribe(pMap => {
        this.clientService.getClient(pMap.get('clientId'))
          .subscribe(data => {
            this.setClientData(data);
          });
        const mode = pMap.get('mode');
        if ('detail' === mode) {
          this.title = 'Show Client';
          this.editMode = false;
        } else {
          this.title = 'Edit Client';
          this.editMode = true;
        }
      });
  }

  save() {
    this.clientService.edit(this.client)
      .subscribe(data => {
        this.setClientData(data);
        this.router.navigateByUrl('/client/detail/' + data.clientId);
      });
    return false;
  }

  lockClient(): boolean {
    this.matDialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Please Confirm',
        confirmation: 'Do you want to lock the client ' + this.client.clientName + '?'
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
        confirmation: 'Do you want to enable the client ' + this.client.clientName + '?'
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

  deleteScope(scopeId: string) {
    this.client.scopes = this.client.scopes.filter(obj => obj.scopeId !== scopeId);
    this.scopeDS = new MatTableDataSource(this.client.scopes);
  }

  addScope() {
    this.matDialog.open(AddScopeDialogComponent, {})
      .afterClosed()
      .subscribe(result => {
        if (result) {
          if (!this.client.scopes) {
            this.client.scopes = [];
          }
          const exists = this.client.scopes.filter(s => s.scopeId === result.scopeId).length;
          if (!exists) {
            this.client.scopes.push(result);
            this.scopeDS = new MatTableDataSource(this.client.scopes);
          }
        }
      });
  }

  private setClientData(data) {
    this.client = data;
    this.scopeDS = new MatTableDataSource(data.scopes);
    this.clientObserver.emit(data);
  }
}
