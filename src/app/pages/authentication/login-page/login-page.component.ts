import { Component } from '@angular/core';
import {User} from "../../../models/user";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {ExceptionManagerService} from "../../../services/exception-manager.service";

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
        // Salvataggio token jwt in localstorage e inizializzazione utente corrente con username
        localStorage.setItem('currentUser', JSON.stringify({token: response.jwt}))
        this.userService.user = {} as User
        this.userService.user.username = this.user.username
        console.log(this.userService.user)

        this.userService.getInfo(this.userService.user)
          .then(response => {
            console.log("entrato con username: "+(response as User).username)
            this.userService.user = response as User

            // Vado a schermata successiva a seconda del RUOLO
            switch (this.userService.user.role) {
              case "Admin":
                console.log("i am an Admin")
                localStorage.setItem('currentRole', "Admin")
                break
              case "MunicipalOffice":
                console.log("i am a MunicipalOffice")
                this.route.navigateByUrl('municipal_office/citizens-list')
                localStorage.setItem('currentRole', "MunicipalOffice")
                break
              case "WasteManagementCompany":
                console.log("i am a WasteManagementCompany")
                localStorage.setItem('currentRole', "WasteManagementCompany")
                break
              case "Citizen":
                console.log("i am a Citizen")
                localStorage.setItem('currentRole', "Citizen")
                break
              default:
                window.alert(this.exceptionManager.getExceptionMessage(0, "A"));
            }

        })
          .catch(error => {
            // Mostro errore
            window.alert(this.exceptionManager.getExceptionMessage(error.error.code, "A"));
          });
      })
      .catch(error => {
        // Mostro errore
        window.alert(this.exceptionManager.getExceptionMessage(error.error.code, "A"));
      });
  }
}
