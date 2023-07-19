import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import {FormsModule} from "@angular/forms";
import {UsersService} from "./services/users.service";
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import { LoginPageComponent } from './components/login-page/login-page.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { PasswordResetTokenValidationComponent } from './components/password-reset-token-validation/password-reset-token-validation.component';
import { PasswordResetByTokenComponent } from './components/password-reset-by-token/password-reset-by-token.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    AboutComponent,
    ContactComponent,
    LoginPageComponent,
    PasswordResetComponent,
    PasswordResetTokenValidationComponent,
    PasswordResetByTokenComponent
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
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
