import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarCitizenComponent } from './navbar-citizen.component';

describe('NavbarCitizenComponent', () => {
  let component: NavbarCitizenComponent;
  let fixture: ComponentFixture<NavbarCitizenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarCitizenComponent]
    });
    fixture = TestBed.createComponent(NavbarCitizenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
