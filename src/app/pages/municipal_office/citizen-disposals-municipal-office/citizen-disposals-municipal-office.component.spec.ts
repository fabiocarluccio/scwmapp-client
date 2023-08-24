import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenDisposalsMunicipalOfficeComponent } from './citizen-disposals-municipal-office.component';

describe('CitizenDisposalsMunicipalOfficeComponent', () => {
  let component: CitizenDisposalsMunicipalOfficeComponent;
  let fixture: ComponentFixture<CitizenDisposalsMunicipalOfficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CitizenDisposalsMunicipalOfficeComponent]
    });
    fixture = TestBed.createComponent(CitizenDisposalsMunicipalOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
