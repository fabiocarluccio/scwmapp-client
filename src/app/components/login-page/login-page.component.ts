import { Component } from '@angular/core';
import {User} from "../../models/user";
import {UsersService} from "../../services/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  user:User = {} as User;

  constructor(private usersService:UsersService, private route:Router) {
  }


  onSubmit(userForm: any) {
    console.log("onSubmit() called")
    console.log(userForm);

    this.user.username = userForm.form.value.username;
    this.user.email = userForm.form.value.email;

    this.usersService.createUser(this.user);
  }

  loginUser() {
    console.log("loginUser() called")
  }
}
