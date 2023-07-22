import { Component } from '@angular/core';
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {ExceptionManagerService} from "../../services/exception-manager.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  user:User = {} as User;

  constructor(private userService:UserService, private route:Router, private exceptionManager:ExceptionManagerService) {
  }


  onSubmit(userForm: any) {
    console.log("onSubmit() called")
    /*console.log(userForm);

    this.user.username = userForm.form.value.username;
    this.user.email = userForm.form.value.email;
    */

    // TODO logica login!!1
    //this.usersService.createUser(this.user);
  }

  loginUser() {
    console.log("loginUser() called")
    console.log(this.user)
    this.userService.authenticate(this.user)
      .then(response => {
        // TODO Vado a schermata successiva a seconda del RUOLO
        //this.userService.user = this.user
        //this.route.navigateByUrl('/password-reset-token-validation');
      })
      .catch(error => {
        // Mostro errore
        window.alert(this.exceptionManager.getExceptionMessage(error.error.code, "A"));
      });
  }
}
