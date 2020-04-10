import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../model/user';
import {UserService} from '../../../service/user.service';
import {MatDialog} from '@angular/material/dialog';
import {FormService} from "../../../basic-ui/form.service";
import {EditControl} from "../../../basic-ui/edit-control";
import {FormGroup} from "@angular/forms";
import {FormConfig} from "./user-form-config";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  @Output() activeUser: EventEmitter<User> = new EventEmitter();
  controls: EditControl[];
  formGroup: FormGroup;
  user: User = {} as User;

  constructor(private userService: UserService,
              private activeRoute: ActivatedRoute,
              private router: Router,
              public formService: FormService,
              private matDialog: MatDialog) {
  }

  ngOnInit() {
    this.resetUser();
    this.controls = FormConfig;
    this.formGroup = this.formService.toFormGroup(this.controls);
  }

  resetUser() {
    this.activeRoute.paramMap
      .subscribe(pMap => {
        this.userService.getUser(pMap.get('username'))
          .subscribe(data => {
            this.setUserData(data);
            this.activeUser.emit(data);
          });
      });
  }

  private setUserData(data: User) {
    this.formGroup.patchValue(data);
    this.user = data;
  }

  save(): boolean {
    if (this.formGroup.valid) {
      this.userService.edit(this.formGroup.value)
        .subscribe(data => {
          this.router.navigateByUrl('/user/detail/' + data.username).then(() => {
          });
        });
    }
    return false;
  }
}
