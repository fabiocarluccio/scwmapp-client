import { Component } from '@angular/core';
import {User} from "../../../models/user";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {ExceptionManagerService} from "../../../services/exception-manager.service";
import {SmartBinService} from "../../../services/smart-bin.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  user:User = {} as User;

  constructor(private userService:UserService,
              private route:Router,
              private exceptionManager:ExceptionManagerService,
              private smartBinService: SmartBinService) {
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
        // Salvataggio token jwt in localstorage e inizializzazione utente corrente
        localStorage.setItem('currentUser', JSON.stringify({token: response.jwt}))

        this.userService.getInfo(this.user)
          .then(response => {
            this.userService.user = response as User
            //this.userService.user = {} as User
            //this.userService.user.username = this.user.username
            console.log(this.userService.user)

            // load tipologie rifiuti (in modo da farlo solo una volta)
            this.smartBinService.loadWasteTypes()

            this.userService.getInfo(this.userService.user)
              .then(response => {
                console.log("entrato con username: "+(response as User).username)
                this.userService.user = response as User
                localStorage.setItem("userId", this.userService.user.id!)

                // Vado a schermata successiva a seconda del RUOLO
                switch (this.userService.user.role) {
                  case "Admin":
                    console.log("i am an Admin")
                    localStorage.setItem('currentRole', "Admin")
                    break
                  case "MunicipalOffice":
                    console.log("i am a MunicipalOffice")
                    localStorage.setItem('currentRole', "MunicipalOffice")
                    this.route.navigateByUrl('municipal_office/citizens-list')
                    break
                  case "WasteManagementCompany":
                    console.log("i am a WasteManagementCompany")
                    localStorage.setItem('currentRole', "WasteManagementCompany")
                    this.route.navigateByUrl('waste_management_company/smartbin-dashboard')
                    break
                  case "Citizen":
                    console.log("i am a Citizen")
                    localStorage.setItem('currentRole', "Citizen")
                    this.route.navigateByUrl('citizen')
                    break
                  default:
                    console.log("i am an ADMIN")
                    localStorage.setItem('currentRole', "ADMIN") // TODO vecchio: scommentare quello sotto e cancellare queste due righe
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

      })
      .catch(error => {
        // Mostro errore
        window.alert(this.exceptionManager.getExceptionMessage(error.error.code, "A"));
      });
  }
}
