import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Scope} from '../../../model/scope';
import {MatPaginator} from '@angular/material/paginator';
import {ScopeService} from '../../../service/scope.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-list-scope',
  templateUrl: './list-scope.component.html',
  styleUrls: ['./list-scope.component.scss']
})
export class ListScopeComponent implements OnInit {

  displayedColumns = ['scopeId', 'scopeName'];
  dataSource: MatTableDataSource<Scope> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private scopeService: ScopeService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.scopeService.listScopes(null)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource<Scope>(data);
        this.dataSource.paginator = this.paginator;
      }, err => {
        this.dataSource = null;
        console.log(err);
      });
  }

}
