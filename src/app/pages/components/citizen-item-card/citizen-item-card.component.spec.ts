import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenItemCardComponent } from './citizen-item-card.component';

describe('CitizenItemCardComponent', () => {
  let component: CitizenItemCardComponent;
  let fixture: ComponentFixture<CitizenItemCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CitizenItemCardComponent]
    });
    fixture = TestBed.createComponent(CitizenItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
