import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from '../../../model/user';
import {UserService} from '../../../service/user.service';
import {ActivatedRoute} from '@angular/router';
import {UserClaim} from '../../../model/user-claim';
import {Address} from '../../../model/address';
import {ClaimService} from '../../../service/claim.service';
import {Claim} from '../../../model/claim';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss']
})
export class DetailUserComponent implements OnInit {

  @Output() activeUser: EventEmitter<User> = new EventEmitter();
  user = {} as User;
  customClaims: Array<Claim> = [];

  constructor(private userService: UserService,
              private activeRoute: ActivatedRoute,
              private claimService: ClaimService) {
    this.user.userClaims = {} as UserClaim;
    this.user.userClaims.address = {} as Address;
  }

  ngOnInit(): void {
    this.activeRoute.paramMap
      .subscribe(pMap => {
        this.userService.getUser(pMap.get('username'))
          .subscribe(data => {
            this.user = data;
            this.activeUser.emit(data);
          });
      });
    this.claimService.listClaims({custom: true} as Claim)
      .subscribe(data => {
        this.customClaims = data;
      });
  }

  getUserName() {
    return this.user.username;
  }
}
