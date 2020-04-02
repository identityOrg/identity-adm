import {Component, OnInit, ViewChild} from '@angular/core';
import {ClientService} from '../../service/client.service';
import {Client} from '../../model/client';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  displayedColumns = ['clientId', 'clientName', 'status', 'creationDate', 'expiryDate'];
  dataSource: MatTableDataSource<Client> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private clientService: ClientService) {
  }

  ngOnInit() {
    this.clientService.listClients(null)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      }, err => {
        this.dataSource = null;
        console.log(err);
      });
  }

}
