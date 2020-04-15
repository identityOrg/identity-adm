import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {EditControl} from "../../model/edit-control";

@Component({
  selector: 'app-dynamic-edit',
  templateUrl: './dynamic-edit.component.html',
  styleUrls: ['./dynamic-edit.component.scss']
})
export class DynamicEditComponent implements OnInit {

  @Input() editControl: EditControl;

  constructor() {
  }

  ngOnInit(): void {
  }

}
