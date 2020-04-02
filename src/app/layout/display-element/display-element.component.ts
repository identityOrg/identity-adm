import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-display-element',
  templateUrl: './display-element.component.html',
  styleUrls: ['./display-element.component.scss']
})
export class DisplayElementComponent implements OnInit {

  @Input() yesNo = false;
  @Input() displayName: string;
  @Input() icon: string;
  @Input() value: any;
  @Input() attrName: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
