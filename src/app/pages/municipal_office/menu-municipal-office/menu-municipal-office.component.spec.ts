import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMunicipalOfficeComponent } from './menu-municipal-office.component';

describe('MenuMunicipalOfficeComponent', () => {
  let component: MenuMunicipalOfficeComponent;
  let fixture: ComponentFixture<MenuMunicipalOfficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuMunicipalOfficeComponent]
    });
    fixture = TestBed.createComponent(MenuMunicipalOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
