import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, firstValueFrom, tap} from "rxjs";
import {Disposal} from "../models/disposal";

@Injectable({
  providedIn: 'root'
})
export class DisposalService {

  disposalsPath: string = '/assets/data/disposals.json';
  //disposalPath: string = '/assets/data/disposal.json';
  disposals: Disposal[] = [] as Disposal[];
  //disposal: Disposal = {} as Disposal

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':''
    })
  }

  baseUrl:string = "http://localhost:8082/api/disposal/";

  constructor(private http: HttpClient) { }

  loadLastDisposals(citizenId: string) {
    return firstValueFrom(this.http.get(this.disposalsPath).pipe(
      tap((response: any) => {
        console.log('Richiesta GET riuscita:', response);
        this.disposals = response
        console.log(response)

      }),
      catchError(error => {
        console.error('Errore durante la richiesta POST:', error);
        throw error; // Rilancia l'errore come promessa respinta
      })
    ));
  }

  loadDisposals(s: string) {
    return firstValueFrom(this.http.get(this.disposalsPath).pipe(
      tap((response: any) => {
        console.log('Richiesta GET riuscita:', response);
        this.disposals = response
        console.log(response)

      }),
      catchError(error => {
        console.error('Errore durante la richiesta POST:', error);
        throw error; // Rilancia l'errore come promessa respinta
      })
    ));
  }
}
