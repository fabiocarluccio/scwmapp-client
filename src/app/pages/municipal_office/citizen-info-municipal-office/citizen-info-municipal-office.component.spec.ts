import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenInfoMunicipalOfficeComponent } from './citizen-info-municipal-office.component';

describe('CitizenInfoComponent', () => {
  let component: CitizenInfoMunicipalOfficeComponent;
  let fixture: ComponentFixture<CitizenInfoMunicipalOfficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CitizenInfoMunicipalOfficeComponent]
    });
    fixture = TestBed.createComponent(CitizenInfoMunicipalOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
