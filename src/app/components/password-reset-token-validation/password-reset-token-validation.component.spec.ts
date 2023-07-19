import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetTokenValidationComponent } from './password-reset-token-validation.component';

describe('PasswordResetTokenValidationComponent', () => {
  let component: PasswordResetTokenValidationComponent;
  let fixture: ComponentFixture<PasswordResetTokenValidationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordResetTokenValidationComponent]
    });
    fixture = TestBed.createComponent(PasswordResetTokenValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
