import {Component, OnInit} from '@angular/core';
import {Claim} from "../../../model/claim";
import {ClaimService} from "../../../service/claim.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-claim',
  templateUrl: './edit-claim.component.html',
  styleUrls: ['./edit-claim.component.scss']
})
export class EditClaimComponent implements OnInit {


  claim: Claim = {} as Claim;

  constructor(private claimService: ClaimService,
              private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activeRoute.paramMap
      .subscribe(pMap => {
        this.claimService.getClaim(pMap.get('claimId'))
          .subscribe(data => {
            this.claim = data;
          });
      });
  }

  resetClaim() {

  }

  save() {

  }

}
