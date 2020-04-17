import {Component, OnInit, ViewChild} from '@angular/core';
import {ScopeService} from '../../../service/scope.service';
import {Scope} from '../../../model/scope';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MediaObserver} from '@angular/flex-layout';
import {MatTableDataSource} from '@angular/material/table';
import {Claim} from '../../../model/claim';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {AddClaimDialogComponent} from '../add-claim-dialog/add-claim-dialog.component';

@Component({
  selector: 'app-edit-scope',
  templateUrl: './edit-scope.component.html',
  styleUrls: ['./edit-scope.component.scss']
})
export class EditScopeComponent implements OnInit {

  displayedColumns: string[] = ['standardAttribute', 'claimType', 'description'];
  dataSource: MatTableDataSource<Claim> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  scope: Scope;

  constructor(private scopeService: ScopeService,
              private activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar,
              private mediaObserver: MediaObserver,
              private matDialog: MatDialog) {
    this.scope = {} as Scope;
    this.scope.attachedClaims = [];
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .subscribe(pMap => {
        const scopeId = pMap.get('scopeId');
        this.scopeService.getScope(scopeId)
          .subscribe(scope => {
            this.setData(scope);
          });
      });

    this.mediaObserver.asObservable()
      .subscribe(() => {
        if (this.mediaObserver.isActive('lt-sm')) {
          this.displayedColumns = ['standardAttribute', 'description', 'delete'];
        } else if (this.mediaObserver.isActive('lt-md')) {
          this.displayedColumns = ['standardAttribute', 'description', 'delete'];
        } else {
          this.displayedColumns = ['standardAttribute', 'claimType', 'description', 'delete'];
        }
      });
  }

  private setData(scope: Scope) {
    this.scope = scope;
    this.dataSource = new MatTableDataSource<Claim>(scope.attachedClaims);
    this.dataSource.paginator = this.paginator;
  }

  reset() {

  }

  save() {
    this.scopeService.update(this.scope)
      .subscribe((scope) => {
        this.scope = scope;
        this.showNotification(scope);
      });
  }

  private showNotification(scope: Scope) {
    this.snackBar.open('Scope ' + scope.scopeId + ' updated!', 'Saved!', {
      duration: 2000,
    });
  }

  addClaim() {
    this.matDialog.open(AddClaimDialogComponent)
      .afterClosed()
      .subscribe(value => {
        if (value) {
          this.scopeService.addClaim(this.scope.scopeId, value)
            .subscribe(scope => {
              this.setData(scope);
              this.showNotification(scope);
            });
        }
      });
  }

  removeClaim(claimId: string) {
    this.scopeService.removeClaim(this.scope.scopeId, claimId)
      .subscribe(scope => {
        this.setData(scope);
        this.showNotification(scope);
      });
  }
}
