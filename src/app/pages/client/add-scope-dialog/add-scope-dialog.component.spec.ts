import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScopeDialogComponent } from './add-scope-dialog.component';

describe('AddScopeDialogComponent', () => {
  let component: AddScopeDialogComponent;
  let fixture: ComponentFixture<AddScopeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddScopeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddScopeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
