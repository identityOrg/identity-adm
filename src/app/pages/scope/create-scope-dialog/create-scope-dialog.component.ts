import {Component, OnInit} from '@angular/core';
import {Scope} from '../../../model/scope';

@Component({
  selector: 'app-create-scope-dialog',
  templateUrl: './create-scope-dialog.component.html',
  styleUrls: ['./create-scope-dialog.component.scss']
})
export class CreateScopeDialogComponent implements OnInit {

  scope: Scope = {} as Scope;

  constructor() {
  }

  ngOnInit(): void {
  }

}
