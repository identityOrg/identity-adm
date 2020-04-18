import {Component, OnInit} from '@angular/core';
import {Claim} from '../../../model/claim';
import {ClaimService} from '../../../service/claim.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detail-claim',
  templateUrl: './detail-claim.component.html',
  styleUrls: ['./detail-claim.component.scss']
})
export class DetailClaimComponent implements OnInit {

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
}
