import { Component } from '@angular/core';
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu-municipal-office',
  templateUrl: './menu-municipal-office.component.html',
  styleUrls: ['./menu-municipal-office.component.scss']
})
export class MenuMunicipalOfficeComponent {

  constructor(private userService:UserService, private route:Router) {
  }
  logout() {

    localStorage.removeItem('currentUser')
    this.userService.user = {} as User

    this.route.navigateByUrl('login-page');

  }
}
