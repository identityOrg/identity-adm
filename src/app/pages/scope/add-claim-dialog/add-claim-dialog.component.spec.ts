import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClaimDialogComponent } from './add-claim-dialog.component';

describe('AddClaimDialogComponent', () => {
  let component: AddClaimDialogComponent;
  let fixture: ComponentFixture<AddClaimDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClaimDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClaimDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
