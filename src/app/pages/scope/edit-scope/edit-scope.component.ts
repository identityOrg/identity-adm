import {Component, Inject, OnInit} from '@angular/core';
import {ScopeService} from '../../../service/scope.service';
import {Scope} from '../../../model/scope';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-scope',
  templateUrl: './edit-scope.component.html',
  styleUrls: ['./edit-scope.component.scss']
})
export class EditScopeComponent implements OnInit {

  title: string;

  scope: Scope = {scopeId: null, scopeName: null};

  scopeId: string;
  edit = false;

  constructor(private dialogRef: MatDialogRef<EditScopeComponent>,
              private scopeService: ScopeService,
              @Inject(MAT_DIALOG_DATA) data) {
    this.scopeId = data.scopeId;
    this.edit = data.edit;
    if (this.edit) {
      this.title = 'Edit Scope';
    } else {
      this.title = 'Create Scope';
    }
  }

  ngOnInit() {
    if (this.edit) {
      this.scopeService.getScope(this.scopeId).subscribe(s => {
        this.scope = s;
      });
    }
  }

  close() {
    this.dialogRef.close(false);
  }

  save() {
    if (this.edit) {
      this.scopeService.update(this.scope)
        .subscribe(s => {
          this.dialogRef.close(true);
        });
    } else {
      this.scopeService.create(this.scope)
        .subscribe(s => {
          this.dialogRef.close(true);
        });
    }
  }

}
