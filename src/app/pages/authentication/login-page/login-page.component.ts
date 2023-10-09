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
              private router:Router,
              private exceptionManager:ExceptionManagerService,
              private smartBinService: SmartBinService) {
  }


  onSubmit(userForm: any) {
    console.log("onSubmit() called")
  }

  loginUser() {
    console.log("loginUser() called")
    console.log(this.user)
    this.userService.authenticate(this.user).then(response => {
      // Salvataggio token jwt in localstorage e inizializzazione utente corrente
      localStorage.setItem('currentUser', JSON.stringify({token: response.jwt}))

      this.userService.getInfo(this.user).then(response => {
        let user = response as User
        console.log(user)

        // load tipologie rifiuti (in modo da farlo solo una volta)
        this.smartBinService.loadWasteTypes()

        console.log("entrato con username: "+(response as User).username)
        user = response as User
        localStorage.setItem("userId", user.id!)

        // Vado a schermata successiva a seconda del RUOLO
        switch (user.role) {
          case "Admin":
            console.log("i am an Admin")
            localStorage.setItem('currentRole', "Admin")
            break
          case "MunicipalOffice":
            console.log("i am a MunicipalOffice")
            localStorage.setItem('currentRole', "MunicipalOffice")
            this.router.navigateByUrl('municipal_office/citizens-list')
            break
          case "WasteManagementCompany":
            console.log("i am a WasteManagementCompany")
            localStorage.setItem('currentRole', "WasteManagementCompany")
            this.router.navigateByUrl('waste_management_company/smartbin-dashboard')
            break
          case "Citizen":
            console.log("i am a Citizen")
            localStorage.setItem('currentRole', "Citizen")
            this.router.navigateByUrl('citizen')
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
  }
}
