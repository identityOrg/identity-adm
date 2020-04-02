import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../../../model/user';
import {MatPaginator} from '@angular/material/paginator';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  displayedColumns = ['username', 'active', 'locked', 'creationDate', 'passwordExpiryDate', 'admin'];
  dataSource: MatTableDataSource<User> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.listUsers(null)
      .subscribe(data => {
        this.dataSource = new MatTableDataSource<User>(data);
        this.dataSource.paginator = this.paginator;
      }, err => {
        this.dataSource = null;
        console.log(err);
      });
  }

}
