import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayElementComponent } from './display-element.component';

describe('DisplayElementComponent', () => {
  let component: DisplayElementComponent;
  let fixture: ComponentFixture<DisplayElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
