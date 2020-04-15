import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../model/user';
import {UserService} from '../../../service/user.service';
import {EditControl} from "../../../basic-ui/edit-control";
import {FormGroup} from "@angular/forms";
import {ClaimService} from "../../../service/claim.service";
import {FormService} from "../../../basic-ui/form.service";
import {Claim} from "../../../model/claim";
import {FormConfig} from "../edit-user/user-form-config";

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
              private claimService: ClaimService,
              public formService: FormService) {
  }

  ngOnInit() {
    this.claimService.listClaims({custom: true, claimType: 'NORMAL'} as Claim)
      .subscribe(data => {
        FormConfig.forEach(ctrl => {
          if (ctrl?.name === 'username'){
            ctrl.groupName = 'general';
          }
          if (ctrl?.name === 'userClaims') {
            data.forEach(dt => {
              let childCtrl = new EditControl({
                name: dt.standardAttribute,
                label: dt.description,
                type: 'text',
                groupName: 'custom'
              });
              ctrl.children.push(childCtrl);
            });
          }
        });
        this.controls = FormConfig;
        this.formGroup = this.formService.toFormGroup(this.controls);
      });
  }

  resetUser() {
    this.setUserData({} as User);
  }

  private setUserData(data: User) {
    this.formGroup.patchValue(data);
    this.user = data;
  }

  save(): boolean {
    if (this.formGroup.valid) {
      this.userService.create(this.formGroup.value)
        .subscribe(data => {
          this.router.navigateByUrl('/user/detail/' + data.username).then(() => {
          });
        });
    }
    return false;
  }
}
