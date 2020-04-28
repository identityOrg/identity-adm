import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Client} from '../../../model/client';
import {ClientService} from '../../../service/client.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {DiscoveryDocument} from '../../../model/discovery-document';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  @Output() clientObserver: EventEmitter<Client> = new EventEmitter();
  client: Client;
  clientForm: FormGroup;
  discovery: DiscoveryDocument = {} as DiscoveryDocument;
  redirectUris: FormArray;
  requestUris: FormArray;

  constructor(private clientService: ClientService,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private matDialog: MatDialog,
              private matSnackBar: MatSnackBar) {
    this.client = {} as Client;
    this.client.clientMetadata = {};
    this.clientForm = clientService.createFormGroup();
    this.redirectUris = this.clientForm.get('clientMetadata').get('redirect_uris') as FormArray;
    this.requestUris = this.clientForm.get('clientMetadata').get('request_uris') as FormArray;
  }

  ngOnInit() {
    this.activeRoute.paramMap
      .subscribe(pMap => {
        this.clientService.getClient(pMap.get('clientId'))
          .subscribe(data => {
            this.setClientData(data);
          });
      });
    this.clientService.getDiscoveryDocument()
      .subscribe(doc => {
        this.discovery = doc;
        console.log(doc);
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
        this.matSnackBar.open('Client saved', 'done', {duration: 2000});
      });
    return false;
  }

  resetUser() {
  }

  addControl(formArray: FormArray) {
    formArray.push(new FormControl(null));
  }

  deleteControl(formArray: FormArray, index: number, keepLast = false) {
    if (formArray.length > 1 || !keepLast) {
      formArray.removeAt(index);
    }
  }
}
