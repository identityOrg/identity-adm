import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Claim} from "../../../model/claim";
import {MatPaginator} from "@angular/material/paginator";
import {ClaimService} from "../../../service/claim.service";
import {MediaObserver} from "@angular/flex-layout";

@Component({
  selector: 'app-list-claim',
  templateUrl: './list-claim.component.html',
  styleUrls: ['./list-claim.component.scss']
})
export class ListClaimComponent implements OnInit {

  displayedColumns = ['claimId', 'claimType', 'standardAttribute', 'description'];
  dataSource: MatTableDataSource<Claim> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private claimService: ClaimService, private mediaObserver: MediaObserver) {
  }

  ngOnInit(): void {
    this.claimService.listClaims(null)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource<Claim>(data);
        this.dataSource.paginator = this.paginator;
      }, err => {
        this.dataSource = null;
        console.log(err);
      });

    this.mediaObserver.asObservable()
      .subscribe(() => {
        if (this.mediaObserver.isActive('lt-sm')) {
          this.displayedColumns = ['claimId', 'standardAttribute', 'description'];
        } else {
          this.displayedColumns = ['claimId', 'claimType', 'standardAttribute', 'description'];
        }
      });
  }

}
