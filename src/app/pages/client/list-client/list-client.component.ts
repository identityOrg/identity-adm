import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Client} from '../../../model/client';
import {ClientService} from '../../../service/client.service';
import {MatPaginator} from '@angular/material/paginator';
import {MediaObserver} from '@angular/flex-layout';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent implements OnInit {

  displayedColumns = ['clientId', 'clientName', 'status', 'creationDate', 'expiryDate'];
  dataSource: MatTableDataSource<Client> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private clientService: ClientService, private mediaObserver: MediaObserver) {
  }

  ngOnInit(): void {
    this.clientService.listClients(null)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      }, err => {
        this.dataSource = null;
        console.log(err);
      });

    this.mediaObserver.asObservable()
      .subscribe(() => {
        if (this.mediaObserver.isActive('lt-sm')) {
          this.displayedColumns = ['clientId', 'clientName', 'status'];
        } else {
          this.displayedColumns = ['clientId', 'clientName', 'creationDate', 'expiryDate', 'status'];
        }
      });
  }

}
