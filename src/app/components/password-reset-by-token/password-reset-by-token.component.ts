import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UsersService} from "../../services/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-password-reset-by-token',
  templateUrl: './password-reset-by-token.component.html',
  styleUrls: ['./password-reset-by-token.component.scss']
})
export class PasswordResetByTokenComponent implements OnInit {
  user:User = {} as User;

  constructor(private userService:UserService, private route: Router) {
    this.user = userService.user
  }

  ngOnInit(): void {
  }

  onSubmit(tokenValidateForm: any) {
    // TODO show alert & go back to login page
    window.alert('Password reimpostata.');
    this.userService.user = {} as User;
    this.route.navigateByUrl('/login-page');
  }

  setNewPassword() {
    this.userService.updatePasswordByToken(this.user);
  }
}
