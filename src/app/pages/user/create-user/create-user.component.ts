import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../model/user';
import {UserService} from '../../../service/user.service';
import {EditControl} from '../../../model/edit-control';
import {FormGroup} from '@angular/forms';
import {ClaimService} from '../../../service/claim.service';
import {FormService} from '../../../service/form.service';
import {Claim} from '../../../model/claim';
import {CreateFormConfig} from './create-user-form-config';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  @Output() activeUser: EventEmitter<User> = new EventEmitter();
  controls: EditControl[] = [];
  formGroup: FormGroup;
  user: User = {} as User;

  constructor(private userService: UserService,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar,
              private claimService: ClaimService,
              public formService: FormService) {
  }

  ngOnInit() {
    this.claimService.listClaims({custom: true, claimType: 'NORMAL'} as Claim)
      .subscribe(data => {
        this.controls = this.formService.addCustomUserAttributes(CreateFormConfig, data);
        this.formGroup = this.formService.toFormGroup(this.controls);
      });
  }

  resetUser() {
    this.setUserData({} as User);
  }

  save(): boolean {
    if (this.formGroup.valid && !this.formGroup.pristine) {
      this.userService.create(this.formGroup.value)
        .subscribe(data => {
          this.router.navigateByUrl('/user/detail/' + data.username).then(() => {
          });
        });
    } else {
      this.snackBar.open('Error: Please correct the form before submitting', 'error', {duration: 2000});
    }
    return false;
  }

  private setUserData(data: User) {
    this.formGroup.patchValue(data);
    this.user = data;
  }
}
