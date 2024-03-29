import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, firstValueFrom, tap} from "rxjs";
import {Tax} from "../models/tax";
import {PaymentData} from "../models/payment-request";
import {HostConfigService} from "./host-config.service";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  taxesPath: string = '/assets/data/taxes.json';
  //taxPath: string = '/assets/data/tax.json';
  taxes: Tax[] = [] as Tax[];
  //tax: Tax = {} as Tax

  baseUrlCitizen:string = '';//"http://localhost:8085/api/taxStatus/";
  baseUrl:string = '';//"http://localhost:8085/api/tax/";

  private _httpOptions: any

  get httpOptions() {
    this._httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //'Authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOlsiaHR0cDovL3NtYXJ0Qmluc01hbmFnZW1lbnRTZXJ2aWNlOjgwODEiLCJodHRwOi8vY2l0aXplbk1hbmFnZW1lbnRTZXJ2aWNlOjgwODIiLCJodHRwOi8vZGlzcG9zYWxNYW5hZ2VtZW50U2VydmljZTo4MDgzIiwiaHR0cDovL3RheFNlcnZpY2U6ODA4NSJdLCJyb2xlIjoiQURNSU4iLCJzdWIiOiJhZG1pbm9vbyIsImlhdCI6MTY5NjMxNzQ0OSwiaXNzIjoiaHR0cDovL2xvZ2luU2VydmljZTo4MDgwIiwiZXhwIjoxNjk2MzUzNDQ5fQ.KtGbnsmZMMGKxOavKH3KdnLGtricxXNuxJStLBuUIAE'
        'Authorization': 'Bearer ' + this.getTokenJWT()
      })
    }
    return this._httpOptions
  }

  getTokenJWT(): string {
    const item = localStorage.getItem("currentUser")
    if (item != null) {
      const array = JSON.parse(item)
      if (array != null) {
        const token = array.token
        if(token != null)
          return token
      }
    }

    return ""
  }

  constructor(private http: HttpClient,
              private hostConfigService: HostConfigService,
              private userService: UserService) {
    this.baseUrl = hostConfigService.TAXMS_BASEURL
    this.baseUrlCitizen = hostConfigService.TAXCitizenMS_BASEURL
  }

  // Serve per capire se le tasse sono state emesse o meno per l'anno corrente
  getTaxStatus() {
    return firstValueFrom(this.http.get(this.baseUrl + 'taxStatus', this.httpOptions).pipe(
      tap((response: any) => {
        console.log('Richiesta GET riuscita:', response);

      }),
      catchError(error => {
        console.error('Errore durante la richiesta GET:', error);
        if(error.status == "401") this.userService.logoutUser() // se token jwt è scaduto, o è non autenticato
        if(error.status == "403") this.userService.goToRoot() // se token jwt è scaduto, o è non autenticato
        throw error; // Rilancia l'errore come promessa respinta
      })
    ));
  }

  // Ottieni la lista di tutti gli stati tassa dei cittadini
  getCitizensTaxStatus() {
    return firstValueFrom(this.http.get(this.baseUrlCitizen, this.httpOptions).pipe(
      tap((response: any) => {
        console.log('Richiesta GET riuscita:', response);

      }),
      catchError(error => {
        console.error('Errore durante la richiesta GET:', error);
        if(error.status == "401") this.userService.logoutUser() // se token jwt è scaduto, o è non autenticato
        if(error.status == "403") this.userService.goToRoot() // se token jwt è scaduto, o è non autenticato
        throw error; // Rilancia l'errore come promessa respinta
      })
    ));
  }


  loadTaxes(citizenId: string) {
    return firstValueFrom(this.http.get(this.baseUrl + "citizen/" + citizenId, this.httpOptions).pipe(
      tap((response: any) => {
        console.log('Richiesta GET riuscita:', response);
        this.taxes = response

      }),
      catchError(error => {
        //if(error && error.error && error.error.name != "CitizenNotFoundException") {
        console.error('Errore durante la richiesta GET:', error);
        if(error.status == "401") this.userService.logoutUser() // se token jwt è scaduto, o è non autenticato
        if(error.status == "403") this.userService.goToRoot() // se token jwt è scaduto, o è non autenticato
        throw error; // Rilancia l'errore come promessa respinta
        //}
        //throw error;
      })
    ));
  }


  emitTaxes(payload: Record<string, number>) {
    console.log(payload)
    return firstValueFrom(this.http.post(this.baseUrl + 'emit', payload, this.httpOptions).pipe(
      tap(response => {
        console.log('Richiesta POST riuscita:', response);
        // Gestisci la risposta dal server qui, se necessario
      }),
      catchError(error => {
        console.error('Errore durante la richiesta POST:', error);
        // Gestisci l'errore qui, se necessario
        if(error.status == "401") this.userService.logoutUser() // se token jwt è scaduto, o è non autenticato
        if(error.status == "403") this.userService.goToRoot() // se token jwt è scaduto, o è non autenticato
        throw error; // Rilancia l'errore come promessa respinta
      })
    ));
  }


  getTax(taxId: string) {
    return firstValueFrom(this.http.get(this.baseUrl + taxId, this.httpOptions).pipe(
      tap((response: any) => {
        console.log('Richiesta GET riuscita:', response);

      }),
      catchError(error => {
        console.error('Errore durante la richiesta GET:', error);
        if(error.status == "401") this.userService.logoutUser() // se token jwt è scaduto, o è non autenticato
        if(error.status == "403") this.userService.goToRoot() // se token jwt è scaduto, o è non autenticato
        throw error; // Rilancia l'errore come promessa respinta

      })
    ));
  }


  payTax(taxId: string, paymentData: PaymentData) {

    return firstValueFrom(this.http.post(this.baseUrl + 'pay/' + taxId, paymentData, this.httpOptions).pipe(
      tap(response => {
        console.log('Richiesta POST riuscita:', response);
        // Gestisci la risposta dal server qui, se necessario
      }),
      catchError(error => {
        console.error('Errore durante la richiesta POST:', error);
        // Gestisci l'errore qui, se necessario
        if(error.status == "401") this.userService.logoutUser() // se token jwt è scaduto, o è non autenticato
        if(error.status == "403") this.userService.goToRoot() // se token jwt è scaduto, o è non autenticato
        throw error; // Rilancia l'errore come promessa respinta
      })
    ));
  }
}
