import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../../../model/user';
import {MatPaginator} from '@angular/material/paginator';
import {UserService} from '../../../service/user.service';
import {MediaObserver} from '@angular/flex-layout';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  displayedColumns = ['username', 'active', 'locked', 'creationDate', 'passwordExpiryDate', 'admin'];
  dataSource: MatTableDataSource<User> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserService, private mediaObserver: MediaObserver) {
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

    this.mediaObserver.asObservable()
      .subscribe(() => {
        if (this.mediaObserver.isActive('lt-sm')) {
          this.displayedColumns = ['username', 'active', 'admin'];
        } else if (this.mediaObserver.isActive('lt-md')) {
          this.displayedColumns = ['username', 'active', 'locked', 'passwordExpiryDate', 'admin'];
        } else {
          this.displayedColumns = ['username', 'active', 'locked', 'creationDate', 'passwordExpiryDate', 'admin'];
        }
      });
  }

}
