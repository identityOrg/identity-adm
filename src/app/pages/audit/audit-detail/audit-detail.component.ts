import {Component, Inject, OnInit} from '@angular/core';
import {Audit} from '../../../model/audit';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-audit-detail',
  templateUrl: './audit-detail.component.html',
  styleUrls: ['./audit-detail.component.scss']
})
export class AuditDetailComponent implements OnInit {

  audit: Audit = {} as Audit;

  constructor(@Inject(MAT_DIALOG_DATA) data) {
    this.audit = data.audit;
  }

  ngOnInit() {
  }

}
