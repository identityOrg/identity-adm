import { Component, OnInit } from '@angular/core';
import {EditControl} from "../../../model/edit-control";
import {Claim} from "../../../model/claim";
import {FormGroup} from "@angular/forms";
import {ClaimService} from "../../../service/claim.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormService} from "../../../service/form.service";

@Component({
  selector: 'app-create-claim',
  templateUrl: './create-claim.component.html',
  styleUrls: ['./create-claim.component.scss']
})
export class CreateClaimComponent implements OnInit {

  private FormConfig = [
    new EditControl({name: 'standardAttribute', label: 'Standard Attribute', type: 'text', groupName: 'general'}),
    new EditControl({name: 'description', label: 'Description', type: 'text', groupName: 'general'}),
  ];
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
  }

  save() {
    if (this.formGroup.valid) {
      this.claimService.create(this.formGroup.value)
        .subscribe(data => {
          this.router.navigateByUrl('/claim/detail/' + data.id).then(() => {
          });
        });
    }
    return false;
  }

}
