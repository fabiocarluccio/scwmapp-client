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

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':''
    })
  }

  baseUrl:string = "http://localhost:8082/api/tax/";

  constructor(private http: HttpClient) { }

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
  }
}
