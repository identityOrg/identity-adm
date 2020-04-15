import {Component, OnInit} from '@angular/core';
import {ScopeService} from '../../../service/scope.service';
import {Scope} from '../../../model/scope';
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-edit-scope',
  templateUrl: './edit-scope.component.html',
  styleUrls: ['./edit-scope.component.scss']
})
export class EditScopeComponent implements OnInit {

  scope: Scope = {} as Scope;

  constructor(private scopeService: ScopeService,
              private activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .subscribe(pMap => {
        let scopeId = pMap.get('scopeId');
        this.scopeService.getScope(scopeId)
          .subscribe(scope => {
            this.scope = scope;
          });
      });
  }

  reset() {

  }

  save() {
    this.scopeService.update(this.scope)
      .subscribe((scope) => {
        this.scope = scope;
        this.snackBar.open('Scope ' + scope.scopeId + ' updated!', 'Saved!', {
          duration: 2000,
        });
      });
  }
}
