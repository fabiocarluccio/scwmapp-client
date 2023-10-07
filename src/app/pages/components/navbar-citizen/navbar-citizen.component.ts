import { Component } from '@angular/core';
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar-citizen',
  templateUrl: './navbar-citizen.component.html',
  styleUrls: ['./navbar-citizen.component.scss']
})
export class NavbarCitizenComponent {

  constructor(private userService:UserService, private route:Router) {}

  logout() {

    localStorage.removeItem('currentUser')
    localStorage.removeItem('currentRole')
    localStorage.removeItem('userId')
    localStorage.removeItem('wasteTypes')

    this.userService.user = {} as User

    this.route.navigateByUrl('login-page');

  }
}
