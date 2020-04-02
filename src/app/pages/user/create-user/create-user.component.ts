import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../model/user';
import {UserService} from '../../../service/user.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  user = {} as User;

  constructor(private userService: UserService,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private matDialog: MatDialog) {
  }

  ngOnInit() {
    const user = {} as User;

    this.setUserData(user);
  }

  private setUserData(data: User) {
    this.user = data;
  }

  save() {
    this.userService.create(this.user)
      .subscribe(data => {
        this.setUserData(data);
        this.router.navigateByUrl('/user/detail/' + data.username);
      });
    return false;
  }

}
