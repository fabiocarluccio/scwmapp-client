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

    this.userService.logoutUser()

  }
}
