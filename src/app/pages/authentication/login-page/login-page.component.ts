import {Component, OnInit} from '@angular/core';
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
export class LoginPageComponent implements OnInit {
  user:User = {} as User;

  constructor(private userService:UserService,
              private router:Router,
              private exceptionManager:ExceptionManagerService,
              private smartBinService: SmartBinService) {
  }

  ngOnInit() {
    // Controlla se l'URL contiene una route wildcard '**'
    if (this.router.url != "/") {
      // Reindirizza manualmente
      if(localStorage.getItem('currentRole') == 'Citizen')
        this.router.navigateByUrl('/citizen');
      else if(localStorage.getItem('currentRole') == 'MunicipalOffice')
        this.router.navigateByUrl('/municipal_office/citizens-list');
      else if(localStorage.getItem('currentRole') == 'WasteManagementCompany')
        this.router.navigateByUrl('/waste_management_company/smartbin-dashboard');
      else this.router.navigateByUrl('/');
    } else { // controllo se l'utente abbia già effettuato l'accesso
      if(localStorage.getItem('currentRole') == 'Citizen')
        this.router.navigateByUrl('/citizen');
      else if(localStorage.getItem('currentRole') == 'MunicipalOffice')
        this.router.navigateByUrl('/municipal_office/citizens-list');
      else if(localStorage.getItem('currentRole') == 'WasteManagementCompany')
        this.router.navigateByUrl('/waste_management_company/smartbin-dashboard');
    }
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
            window.alert(this.exceptionManager.getExceptionMessage("Exception", "A", ""));
        }
      })
      .catch(error => {
        // Mostro errore
        console.log(error)
        window.alert(this.exceptionManager.getExceptionMessage(error.error.name, "A", error.error.description));
      });

    })
    .catch(error => {
      // Mostro errore
      window.alert(this.exceptionManager.getExceptionMessage(error.error.name, "A", error.error.description));
    });
}
}
