import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UsersService} from "../../services/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {ExceptionManagerService} from "../../services/exception-manager.service";

@Component({
  selector: 'app-password-reset-by-token',
  templateUrl: './password-reset-by-token.component.html',
  styleUrls: ['./password-reset-by-token.component.scss']
})
export class PasswordResetByTokenComponent implements OnInit {
  user:User = {} as User;

  constructor(private userService:UserService, private route: Router, private exceptionManager: ExceptionManagerService) {
    this.user = userService.user
  }

  ngOnInit(): void {
  }

  onSubmit(tokenValidateForm: any) {

  }

  setNewPassword() {
    this.userService.updatePasswordByToken(this.user)
      .then(response => {
        // Gestisci il successo della richiesta POST qui
        console.log('Richiesta POST riuscita:', response);
        // Show alert and go back to login page
        window.alert('Password reimpostata.');
        this.userService.user = {} as User;
        this.route.navigateByUrl('/login-page');
      })
      .catch(error => {
        // Gestisci l'errore della richiesta POST qui
        console.error('Errore durante la richiesta POST:', error);
        // Mostro errore
        if(error.error.code != 1) {
          window.alert(this.exceptionManager.getExceptionMessage(error.error.code, "A"));
        } else { // Errore interno del server nel caso in cui lo username non esiste
          window.alert(this.exceptionManager.getExceptionMessage(error.error.code, "B"));
        }
      });
  }
}
