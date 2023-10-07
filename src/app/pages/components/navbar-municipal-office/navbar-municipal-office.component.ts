import { Component } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../../models/user";

@Component({
  selector: 'app-navbar-municipal-office',
  templateUrl: './navbar-municipal-office.component.html',
  styleUrls: ['./navbar-municipal-office.component.scss']
})
export class NavbarMunicipalOfficeComponent {

  constructor(private userService:UserService, private route:Router) {}

  logout() {

    localStorage.removeItem('currentUser')
    localStorage.removeItem('currentRole')
    localStorage.removeItem('userId')
    localStorage.removeItem('wasteTypes')
    localStorage.removeItem('citizen')

    this.userService.user = {} as User

    this.route.navigateByUrl('login-page');

  }
}
