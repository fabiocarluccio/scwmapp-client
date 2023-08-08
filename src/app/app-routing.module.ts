import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule, Routes} from "@angular/router";
import {UsersComponent} from "./pages/unused/users/users.component";
import {AboutComponent} from "./pages/unused/about/about.component";
import {ContactComponent} from "./pages/unused/contact/contact.component";
import {LoginPageComponent} from "./pages/authentication/login-page/login-page.component";
import {PasswordResetComponent} from "./pages/authentication/password-reset/password-reset.component";
import {
  PasswordResetTokenValidationComponent
} from "./pages/authentication/password-reset-token-validation/password-reset-token-validation.component";
import {PasswordResetByTokenComponent} from "./pages/authentication/password-reset-by-token/password-reset-by-token.component";
import {
  MenuMunicipalOfficeComponent
} from "./pages/municipal_office/menu-municipal-office/menu-municipal-office.component";
import {
  SmartBinAllocationMunicipalOfficeComponent
} from "./pages/municipal_office/smartbin-allocation-municipal-office/smart-bin-allocation-municipal-office.component";

const routes: Routes = [ // questo sarà un array di hops (di paths che sono supportati dall'applicazione)
  { path: '', component: UsersComponent },              // Ogni route è definita da due attributi:
  { path: 'about', component: AboutComponent },         // - il path come stringa,
  { path: 'contact', component: ContactComponent },     // - il componente associato a quel path.
  { path: 'about/:userid', component: AboutComponent },
  { path: 'login-page', component: LoginPageComponent },
  { path: 'password-reset', component: PasswordResetComponent },
  { path: 'password-reset-token-validation', component: PasswordResetTokenValidationComponent },
  { path: 'password-reset-by-token', component: PasswordResetByTokenComponent },
  { path: 'municipal_office/menu', component: MenuMunicipalOfficeComponent },
  { path: 'municipal_office/smartbin-allocation', component: SmartBinAllocationMunicipalOfficeComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
