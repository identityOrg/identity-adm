import {Component, OnInit} from '@angular/core';
import {Scope} from '../../../model/scope';
import {Client} from '../../../model/client';
import {AddScopeDialogComponent} from '../add-scope-dialog/add-scope-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientService} from '../../../service/client.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  client = {} as Client;

  scopeColumns = ['scopeId', 'scopeName', 'actions'];
  scopeDS: MatTableDataSource<Scope> = null;

  constructor(private clientService: ClientService,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private matDialog: MatDialog) {
  }

  ngOnInit() {
    const client = {} as Client;
    client.scopes = [];

    this.setClientData(client);
  }

  save() {
    this.clientService.create(this.client)
      .subscribe(data => {
        this.setClientData(data);
        this.router.navigateByUrl('/client/detail/' + data.clientId);
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
  }
}
