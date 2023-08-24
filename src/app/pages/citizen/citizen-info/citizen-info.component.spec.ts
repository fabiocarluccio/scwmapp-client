import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenInfoComponent } from './citizen-info.component';

describe('CitizenInfoComponent', () => {
  let component: CitizenInfoComponent;
  let fixture: ComponentFixture<CitizenInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CitizenInfoComponent]
    });
    fixture = TestBed.createComponent(CitizenInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
