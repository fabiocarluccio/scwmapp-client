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
  SmartBinAllocationMunicipalOfficeComponent
} from "./pages/municipal_office/smartbin-allocation-municipal-office/smart-bin-allocation-municipal-office.component";
import {
  SmartBinDashboardWmcComponent
} from "./pages/waste_management_company/smart-bin-dashboard-wmc/smart-bin-dashboard-wmc.component";
import {CitizensListComponent} from "./pages/municipal_office/citizens-list/citizens-list.component";
import {CitizenInfoMunicipalOfficeComponent} from "./pages/municipal_office/citizen-info-municipal-office/citizen-info-municipal-office.component";
import {EmitTaxesComponent} from "./pages/municipal_office/emit-taxes/emit-taxes.component";
import {CitizenInfoComponent} from "./pages/citizen/citizen-info/citizen-info.component";
import {DisposalsComponent} from "./pages/citizen/disposals/disposals.component";
import {
  CitizenDisposalsMunicipalOfficeComponent
} from "./pages/municipal_office/citizen-disposals-municipal-office/citizen-disposals-municipal-office.component";
import {WasteTypesWmcComponent} from "./pages/waste_management_company/waste-types-wmc/waste-types-wmc.component";
import {LightPayComponent} from "./pages/external/light-pay/light-pay.component";

const routes: Routes = [ // questo sarà un array di hops (di paths che sono supportati dall'applicazione)
  { path: '', component: UsersComponent },              // Ogni route è definita da due attributi:
  { path: 'about', component: AboutComponent },         // - il path come stringa,
  { path: 'contact', component: ContactComponent },     // - il componente associato a quel path.
  { path: 'about/:userid', component: AboutComponent },
  { path: 'login-page', component: LoginPageComponent },
  { path: 'password-reset', component: PasswordResetComponent },
  { path: 'password-reset-token-validation', component: PasswordResetTokenValidationComponent },
  { path: 'password-reset-by-token', component: PasswordResetByTokenComponent },
  { path: 'municipal_office/smartbin-allocation', component: SmartBinAllocationMunicipalOfficeComponent },
  { path: 'waste_management_company/smartbin-dashboard', component: SmartBinDashboardWmcComponent },
  { path: 'municipal_office/citizens-list', component: CitizensListComponent },
  { path: 'municipal_office/citizen-info/:citizenId', component: CitizenInfoMunicipalOfficeComponent },
  { path: 'municipal_office/emit-taxes', component: EmitTaxesComponent },
  { path: 'citizen', component: CitizenInfoComponent },
  { path: 'citizen/disposals', component: DisposalsComponent },
  { path: 'municipal_office/citizen-info/disposals/:citizenId', component: CitizenDisposalsMunicipalOfficeComponent },
  { path: 'waste_management_company/waste-types', component: WasteTypesWmcComponent },
  { path: 'external/light-pay/:taxId', component: LightPayComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
