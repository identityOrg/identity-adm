import {Component, OnInit} from '@angular/core';
import {User} from "../../model/user";
import {ConfirmDialogComponent} from "../../confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  activeUser: User;

  constructor(private userService: UserService,
              private matDialog: MatDialog) {
  }

  ngOnInit() {
  }

  subscribeUsername(event) {
    if (event.activeUser) {
      event.activeUser.subscribe(user => {
        this.activeUser = user;
      });
    }
  }

  unSubscribeUsername() {
    this.activeUser = null;
  }

  lockUser(): boolean {
    this.matDialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Please Confirm',
        confirmation: 'Do you want to lock the user ' + this.activeUser.username + '?'
      }
    })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.userService.lock(this.activeUser.username)
            .subscribe(data => {
              this.activeUser = data;
            });
        }
      });
    return false;
  }

  enableUser(): boolean {
    this.matDialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Please Confirm',
        confirmation: 'Do you want to enable the user ' + this.activeUser.username + '?'
      }
    })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.userService.enable(this.activeUser.username, result)
            .subscribe(data => {
              this.activeUser = data;
            });
        }
      });
    return false;
  }
}
