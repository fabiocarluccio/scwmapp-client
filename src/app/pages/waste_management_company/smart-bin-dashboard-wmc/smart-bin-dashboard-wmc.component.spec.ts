import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartBinDashboardWmcComponent } from './smart-bin-dashboard-wmc.component';

describe('SmartBinDashboardWmcComponent', () => {
  let component: SmartBinDashboardWmcComponent;
  let fixture: ComponentFixture<SmartBinDashboardWmcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmartBinDashboardWmcComponent]
    });
    fixture = TestBed.createComponent(SmartBinDashboardWmcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
