import { Injectable } from '@angular/core';
import {Disposal} from "../models/disposal";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, firstValueFrom, tap} from "rxjs";
import {Tax} from "../models/tax";

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  taxesPath: string = '/assets/data/taxes.json';
  //taxPath: string = '/assets/data/tax.json';
  taxes: Tax[] = [] as Tax[];
  //tax: Tax = {} as Tax

  baseUrlCitizen:string = "http://localhost:8085/api/taxStatus/";
  baseUrl:string = "http://localhost:8085/api/tax/";

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

  constructor(private http: HttpClient) { }

  getTaxStatus() {
    return firstValueFrom(this.http.get(this.baseUrl + 'taxStatus', this.httpOptions).pipe(
      tap((response: any) => {
        console.log('Richiesta GET riuscita:', response);

      }),
      catchError(error => {
        if(error && error.error && error.error.name != "CitizenNotFoundException") {
          console.error('Errore durante la richiesta GET:', error);
          throw error; // Rilancia l'errore come promessa respinta
        }
        throw error;
      })
    ));
  }


  loadTaxes(citizenId: string) {
    return firstValueFrom(this.http.get(this.baseUrlCitizen + citizenId, this.httpOptions).pipe(
      tap((response: any) => {
        console.log('Richiesta GET riuscita:', response);
        this.taxes = response

      }),
      catchError(error => {
        if(error && error.error && error.error.name != "CitizenNotFoundException") {
          console.error('Errore durante la richiesta GET:', error);
          throw error; // Rilancia l'errore come promessa respinta
        }
        throw error;
      })
    ));
  }
  /*
  loadTaxes(citizenId: string) {
    return firstValueFrom(this.http.get(this.taxesPath).pipe(
      tap((response: any) => {
        console.log('Richiesta GET riuscita:', response);
        this.taxes = response

      }),
      catchError(error => {
        console.error('Errore durante la richiesta POST:', error);
        throw error; // Rilancia l'errore come promessa respinta
      })
    ));
  }*/
}
