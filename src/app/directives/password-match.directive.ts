import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appPasswordMatch]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordMatchDirective,
      multi: true
    }
  ]
})
export class PasswordMatchDirective implements Validator { // NON L'HO USATA DA NESSUNA PARTE! Da cancellare. La tengo solo per consultarla semmai mi dovesse servire
  validate(control: AbstractControl): ValidationErrors | null {
    const password = control.get('newPassword');
    const confirmPassword = control.get('passwordConfirm');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }

    return null;
  }
}
