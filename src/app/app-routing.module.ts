import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule, Routes} from "@angular/router";
import {UsersComponent} from "./components/users/users.component";
import {AboutComponent} from "./components/about/about.component";
import {ContactComponent} from "./components/contact/contact.component";
import {LoginPageComponent} from "./components/login-page/login-page.component";

const routes: Routes = [ // questo sarà un array di hops (di paths che sono supportati dall'applicazione)
  { path: '', component: UsersComponent },              // Ogni route è definita da due attributi:
  { path: 'about', component: AboutComponent },         // - il path come stringa,
  { path: 'contact', component: ContactComponent },     // - il componente associato a quel path.
  { path: 'about/:userid', component: AboutComponent },
  { path: 'login-page', component: LoginPageComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
