import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailScopeComponent } from './detail-scope.component';

describe('DetailScopeComponent', () => {
  let component: DetailScopeComponent;
  let fixture: ComponentFixture<DetailScopeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailScopeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailScopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
