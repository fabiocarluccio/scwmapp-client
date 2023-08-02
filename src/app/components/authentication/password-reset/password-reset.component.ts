import { Component } from '@angular/core';
import {User} from "../../../models/user";
import {UsersService} from "../../../services/users.service";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {ExceptionManagerService} from "../../../services/exception-manager.service";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent {

  user:User = {} as User;

  constructor(private userService:UserService, private route:Router, private exceptionManager: ExceptionManagerService) {
  }

  onSubmit(emailForm: any) {

  }

  sendEmailToken() { // questo viene chiamato prima di onSubmit()
    // Contatto API per invio token via mail
    this.userService.sendPasswordResetToken(this.user)
      .then(response => {
        // Vado a schermata successiva
        this.userService.user = this.user
        this.route.navigateByUrl('/password-reset-token-validation');
      })
      .catch(error => {
        // Mostro errore
        window.alert(this.exceptionManager.getExceptionMessage(error.error.code, "A"));
      });

    // qui avvalorare una variabile a true se non ci sono errori e mostrare eventuali errori.
  }
}
