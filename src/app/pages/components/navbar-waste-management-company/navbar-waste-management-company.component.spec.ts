import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarWasteManagementCompanyComponent } from './navbar-waste-management-company.component';

describe('NavbarWasteManagementCompanyComponent', () => {
  let component: NavbarWasteManagementCompanyComponent;
  let fixture: ComponentFixture<NavbarWasteManagementCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarWasteManagementCompanyComponent]
    });
    fixture = TestBed.createComponent(NavbarWasteManagementCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
