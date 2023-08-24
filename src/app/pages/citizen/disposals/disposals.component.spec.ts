import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisposalsComponent } from './disposals.component';

describe('DisposalsComponent', () => {
  let component: DisposalsComponent;
  let fixture: ComponentFixture<DisposalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisposalsComponent]
    });
    fixture = TestBed.createComponent(DisposalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
