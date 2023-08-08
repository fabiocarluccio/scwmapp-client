import { Component } from '@angular/core';
import {User} from "../../../models/user";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-password-reset-token-validation',
  templateUrl: './password-reset-token-validation.component.html',
  styleUrls: ['./password-reset-token-validation.component.scss']
})
export class PasswordResetTokenValidationComponent {

  user:User = {} as User;

  constructor(private userService:UserService, private route:Router) {
    if(userService.user.username == null) {
      this.route.navigateByUrl('/login-page');
    }

    this.user = userService.user
  }

  onSubmit(passwordResetForm: any) {

    this.userService.user = this.user
    this.route.navigateByUrl('/password-reset-by-token');
  }

  validateToken() {
    // TODO(opzionale) chiamare API per validare token prima di andare avanti.
  }
}
