import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateScopeDialogComponent } from './create-scope-dialog.component';

describe('CreateScopeDialogComponent', () => {
  let component: CreateScopeDialogComponent;
  let fixture: ComponentFixture<CreateScopeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateScopeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateScopeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
