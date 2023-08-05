import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UsersComponent } from './components/unused/users/users.component';
import {FormsModule} from "@angular/forms";
import {UsersService} from "./services/unused/users.service";
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './components/unused/about/about.component';
import { ContactComponent } from './components/unused/contact/contact.component';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import { LoginPageComponent } from './components/authentication/login-page/login-page.component';
import { PasswordResetComponent } from './components/authentication/password-reset/password-reset.component';
import { PasswordResetTokenValidationComponent } from './components/authentication/password-reset-token-validation/password-reset-token-validation.component';
import { PasswordResetByTokenComponent } from './components/authentication/password-reset-by-token/password-reset-by-token.component';
import { PasswordMatchDirective } from './directives/password-match.directive';
import { MenuMunicipalOfficeComponent } from './components/municipal_office/menu-municipal-office/menu-municipal-office.component';
import { SmartBinAllocationMunicipalOfficeComponent } from './components/municipal_office/smartbin-allocation-municipal-office/smart-bin-allocation-municipal-office.component';
import { MapComponent } from './components/map/map.component';
import {SmartBinService} from "./services/smart-bin.service";
import {PopupService} from "./services/popup.service";

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    AboutComponent,
    ContactComponent,
    LoginPageComponent,
    PasswordResetComponent,
    PasswordResetTokenValidationComponent,
    PasswordResetByTokenComponent,
    PasswordMatchDirective,
    MenuMunicipalOfficeComponent,
    SmartBinAllocationMunicipalOfficeComponent,
    MapComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        RouterOutlet,
        RouterLink,
        RouterLinkActive
    ],
  providers: [
    UsersService,
    //MarkerService,
    PopupService,
    SmartBinService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
