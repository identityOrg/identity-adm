import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ConfirmDialogComponent} from '../../../confirm-dialog/confirm-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../model/user';
import {UserService} from '../../../service/user.service';
import {MatDialog} from '@angular/material/dialog';
import {UserClaim} from '../../../model/user-claim';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  @Output() activeUser: EventEmitter<string> = new EventEmitter();
  editMode = true;
  user = {} as User;

  constructor(private userService: UserService,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private matDialog: MatDialog) {
    this.user.userClaims = {} as UserClaim;
  }

  ngOnInit() {
    this.resetUser();
  }

  private setUserData(data: User) {
    this.user = data;
  }

  save() {
    this.userService.edit(this.user)
      .subscribe(data => {
        this.setUserData(data);
        this.router.navigateByUrl('/user/detail/' + data.username).then(() => {
        });
      });
    return false;
  }

  lockUser(): boolean {
    this.matDialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Please Confirm',
        confirmation: 'Do you want to lock the user ' + this.user.username + '?'
      }
    })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.userService.lock(this.user.username)
            .subscribe(data => {
              this.setUserData(data);
            });
        }
      });
    return false;
  }

  enableUser(): boolean {
    this.matDialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Please Confirm',
        confirmation: 'Do you want to enable the user ' + this.user.username + '?'
      }
    })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.userService.enable(this.user.username, result)
            .subscribe(data => {
              this.setUserData(data);
            });
        }
      });
    return false;
  }

  resetUser() {
    this.activeRoute.paramMap
      .subscribe(pMap => {
        this.userService.getUser(pMap.get('username'))
          .subscribe(data => {
            this.setUserData(data);
            this.activeUser.emit(data.username);
          });
      });
  }
}
