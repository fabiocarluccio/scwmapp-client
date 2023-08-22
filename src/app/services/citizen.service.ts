import { Injectable } from '@angular/core';
import {Citizen} from "../models/citizen";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, firstValueFrom, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CitizenService {

  citizensPath: string = '/assets/data/citizens.json';
  citizenPath: string = '/assets/data/citizen.json';
  citizens: Citizen[] = [] as Citizen[];
  citizen: Citizen = {} as Citizen // sarà usato per caricare le info del cittadino nella schermata delle sue info

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':''
    })
  }

  baseUrl:string = "http://localhost:8082/api/citizen/";

  constructor(private http: HttpClient) { }

  loadCitizens() {
    return firstValueFrom(this.http.get(this.citizensPath).pipe(
      tap((response: any) => {
        console.log('Richiesta GET riuscita:', response);
        this.citizens = response
        console.log(response)

      }),
      catchError(error => {
        console.error('Errore durante la richiesta POST:', error);
        throw error; // Rilancia l'errore come promessa respinta
      })
    ));
  }

  loadCitizen(citizenId: string) {
    return firstValueFrom(this.http.get(this.citizenPath).pipe(
      tap((response: any) => {
        console.log('Richiesta GET riuscita:', response);
        this.citizen = response
        console.log(response)

      }),
      catchError(error => {
        console.error('Errore durante la richiesta POST:', error);
        throw error; // Rilancia l'errore come promessa respinta
      })
    ));
  }
}
