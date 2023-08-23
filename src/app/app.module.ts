import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UsersComponent } from './pages/unused/users/users.component';
import {FormsModule} from "@angular/forms";
import {UsersService} from "./services/unused/users.service";
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './pages/unused/about/about.component';
import { ContactComponent } from './pages/unused/contact/contact.component';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import { LoginPageComponent } from './pages/authentication/login-page/login-page.component';
import { PasswordResetComponent } from './pages/authentication/password-reset/password-reset.component';
import { PasswordResetTokenValidationComponent } from './pages/authentication/password-reset-token-validation/password-reset-token-validation.component';
import { PasswordResetByTokenComponent } from './pages/authentication/password-reset-by-token/password-reset-by-token.component';
import { PasswordMatchDirective } from './directives/password-match.directive';
import { SmartBinAllocationMunicipalOfficeComponent } from './pages/municipal_office/smartbin-allocation-municipal-office/smart-bin-allocation-municipal-office.component';
import { MapComponent } from './pages/components/map/map.component';
import {SmartBinService} from "./services/smart-bin.service";
import {PopupService} from "./services/popup.service";
import { SmartBinItemCardComponent } from './pages/components/smart-bin-item-card/smart-bin-item-card.component';
import { RequestItemCardComponent } from './pages/components/request-item-card/request-item-card.component';
import { SmartBinDashboardWmcComponent } from './pages/waste_management_company/smart-bin-dashboard-wmc/smart-bin-dashboard-wmc.component';
import { CitizensListComponent } from './pages/municipal_office/citizens-list/citizens-list.component';
import { CitizenInfoComponent } from './pages/municipal_office/citizen-info/citizen-info.component';
import { PieChartComponent } from './pages/components/pie-chart/pie-chart.component';
import {NgChartsModule} from "ng2-charts";
import {CitizenService} from "./services/citizen.service";
import {DisposalService} from "./services/disposal.service";
import {SmartBinRequestService} from "./services/smart-bin-request.service";
import {ExceptionManagerService} from "./services/exception-manager.service";
import {CommunicationService} from "./services/communication.service";
import {TaxService} from "./services/tax.service";
import { EmitTaxesComponent } from './pages/municipal_office/emit-taxes/emit-taxes.component';
import { NavbarMunicipalOfficeComponent } from './pages/municipal_office/navbar-municipal-office/navbar-municipal-office.component';

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
    SmartBinAllocationMunicipalOfficeComponent,
    MapComponent,
    SmartBinItemCardComponent,
    RequestItemCardComponent,
    SmartBinDashboardWmcComponent,
    CitizensListComponent,
    CitizenInfoComponent,
    PieChartComponent,
    EmitTaxesComponent,
    NavbarMunicipalOfficeComponent
  ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        NgChartsModule
    ],
  providers: [
    UsersService,
    ExceptionManagerService,
    //MarkerService,
    PopupService,
    SmartBinService,
    SmartBinRequestService,
    CommunicationService,
    CitizenService,
    DisposalService,
    TaxService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
