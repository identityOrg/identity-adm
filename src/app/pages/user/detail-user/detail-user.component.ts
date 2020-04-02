import {Component, OnInit} from '@angular/core';
import {User} from '../../../model/user';
import {UserService} from '../../../service/user.service';
import {ActivatedRoute} from '@angular/router';
import {UserClaim} from '../../../model/user-claim';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss']
})
export class DetailUserComponent implements OnInit {

  user = {} as User;

  constructor(private userService: UserService,
              private activeRoute: ActivatedRoute) {
    this.user.userClaims = {} as UserClaim;
  }

  ngOnInit(): void {
    this.activeRoute.paramMap
      .subscribe(pMap => {
        this.userService.getUser(pMap.get('username'))
          .subscribe(data => {
            this.user = data;
          });
      });
  }

}
