import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarMunicipalOfficeComponent } from './navbar-municipal-office.component';

describe('NavbarMunicipalOfficeComponent', () => {
  let component: NavbarMunicipalOfficeComponent;
  let fixture: ComponentFixture<NavbarMunicipalOfficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarMunicipalOfficeComponent]
    });
    fixture = TestBed.createComponent(NavbarMunicipalOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
