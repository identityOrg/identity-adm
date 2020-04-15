import {Component, OnInit} from '@angular/core';
import {Claim} from "../../../model/claim";
import {ClaimService} from "../../../service/claim.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EditControl} from "../../../model/edit-control";
import {FormService} from "../../../service/form.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-edit-claim',
  templateUrl: './edit-claim.component.html',
  styleUrls: ['./edit-claim.component.scss']
})
export class EditClaimComponent implements OnInit {

  private FormConfig = [
    new EditControl({name: 'id', label: 'Identifier', type: 'text', groupName: 'none'}),
    new EditControl({name: 'standardAttribute', label: 'Standard Attribute', type: 'text', groupName: 'general'}),
    new EditControl({name: 'description', label: 'Description', type: 'text', groupName: 'general'}),
  ];
  claim: Claim = {} as Claim;
  formGroup: FormGroup;
  controls: EditControl[];

  constructor(private claimService: ClaimService,
              private activeRoute: ActivatedRoute,
              private router: Router,
              public formService: FormService) {
  }

  ngOnInit(): void {
    this.controls = this.FormConfig;
    this.formGroup = this.formService.toFormGroup(this.controls);
    this.resetClaim();
  }

  resetClaim() {
    this.activeRoute.paramMap
      .subscribe(pMap => {
        this.claimService.getClaim(pMap.get('claimId'))
          .subscribe(data => {
            this.formGroup.patchValue(data);
            this.claim = data;
          });
      });
  }

  save() {
    if (this.formGroup.valid) {
      this.claimService.edit(this.formGroup.value)
        .subscribe(data => {
          this.router.navigateByUrl('/claim/detail/' + data.id).then(() => {
          });
        });
    }
    return false;
  }

}
