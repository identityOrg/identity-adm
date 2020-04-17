import {Component, OnInit} from '@angular/core';
import {ScopeService} from '../../service/scope.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {CreateScopeDialogComponent} from './create-scope-dialog/create-scope-dialog.component';

@Component({
  selector: 'app-scope',
  templateUrl: './scope.component.html',
  styleUrls: ['./scope.component.css']
})
export class ScopeComponent implements OnInit {

  constructor(private scopeService: ScopeService,
              private matDialog: MatDialog,
              private router: Router) {
  }

  ngOnInit() {
  }

  createScope() {
    this.matDialog.open(CreateScopeDialogComponent)
      .afterClosed()
      .subscribe(value => {
        if (value) {
          this.scopeService.create(value)
            .subscribe(scope => {
              this.router.navigateByUrl('/scope/edit/' + scope.scopeId).then(() => {
              });
            });
        }
      });
  }
}
