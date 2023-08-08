import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartBinAllocationMunicipalOfficeComponent } from './smart-bin-allocation-municipal-office.component';

describe('SmartbinAllocationMunicipalOfficeComponent', () => {
  let component: SmartBinAllocationMunicipalOfficeComponent;
  let fixture: ComponentFixture<SmartBinAllocationMunicipalOfficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmartBinAllocationMunicipalOfficeComponent]
    });
    fixture = TestBed.createComponent(SmartBinAllocationMunicipalOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
