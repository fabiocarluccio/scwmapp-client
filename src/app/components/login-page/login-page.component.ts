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
      .then(response => {// TODO
        // Gestisci il successo della richiesta POST qui
        console.log('Richiesta POST riuscita:', response);
        // Vado a schermata successiva
        //this.userService.user = this.user
        //this.route.navigateByUrl('/password-reset-token-validation');
      })
      .catch(error => {
        // Gestisci l'errore della richiesta POST qui
        console.error('Errore durante la richiesta POST:', error);
        // Mostro errore
        window.alert(this.exceptionManager.getExceptionMessage(error.error.code, "A"));
      });
  }
}
