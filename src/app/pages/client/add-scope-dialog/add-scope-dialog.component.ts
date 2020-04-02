import {Component, OnInit} from '@angular/core';
import {ScopeService} from '../../../service/scope.service';
import {Scope} from '../../../model/scope';

@Component({
  selector: 'app-add-scope-dialog',
  templateUrl: './add-scope-dialog.component.html',
  styleUrls: ['./add-scope-dialog.component.scss']
})
export class AddScopeDialogComponent implements OnInit {

  scopeId: string;
  scopes: Scope[];

  constructor(private scopeService: ScopeService) {
  }

  ngOnInit() {
    this.scopeService.listScopes(null)
      .subscribe(data => {
        this.scopes = data;
      });
  }

}
