import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ListScopeComponent} from './list-scope.component';

describe('ListScopeComponent', () => {
  let component: ListScopeComponent;
  let fixture: ComponentFixture<ListScopeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListScopeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListScopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
