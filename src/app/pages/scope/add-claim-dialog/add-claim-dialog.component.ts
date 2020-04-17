import {Component, OnInit} from '@angular/core';
import {Claim} from '../../../model/claim';
import {ClaimService} from '../../../service/claim.service';

@Component({
  selector: 'app-add-claim-dialog',
  templateUrl: './add-claim-dialog.component.html',
  styleUrls: ['./add-claim-dialog.component.scss']
})
export class AddClaimDialogComponent implements OnInit {

  availableClaims: Claim[];
  selectedClaim: string;

  constructor(private claimService: ClaimService) {
  }

  ngOnInit(): void {
    this.claimService.listClaims({} as Claim)
      .subscribe(claims => {
        this.availableClaims = claims;
      });
  }

}
