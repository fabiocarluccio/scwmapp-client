import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SmartBin} from "../models/smartbin";
import {catchError, firstValueFrom, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SmartBinService {

  path: string = '/assets/data/smartbins.json';
  smartBins: SmartBin[] = [] as SmartBin[];

  constructor(private http: HttpClient) { }

  loadBins() {
    return firstValueFrom(this.http.get(this.path).pipe(
      tap((response: any) => {
        console.log('Richiesta GET riuscita:', response.features);
        this.smartBins = response.features
      }),
      catchError(error => {
        console.error('Errore durante la richiesta POST:', error);
        throw error; // Rilancia l'errore come promessa respinta
      })
    ));
  }

  getBinTypeColor(type: string): string {
    switch(type) {
      case "Indifferenziata": return "black";
      case "Vetro": return "green"
      default: return "purple";
    }
  }
}
