import { Component } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../../models/user";

@Component({
  selector: 'app-navbar-waste-management-company',
  templateUrl: './navbar-waste-management-company.component.html',
  styleUrls: ['./navbar-waste-management-company.component.scss']
})
export class NavbarWasteManagementCompanyComponent {

  constructor(private userService:UserService, private route:Router) {}

  logout() {

    localStorage.removeItem('currentUser')
    this.userService.user = {} as User

    this.route.navigateByUrl('login-page');

  }
}
