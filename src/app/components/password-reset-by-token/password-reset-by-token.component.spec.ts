import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetByTokenComponent } from './password-reset-by-token.component';

describe('PasswordResetByTokenComponent', () => {
  let component: PasswordResetByTokenComponent;
  let fixture: ComponentFixture<PasswordResetByTokenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordResetByTokenComponent]
    });
    fixture = TestBed.createComponent(PasswordResetByTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
