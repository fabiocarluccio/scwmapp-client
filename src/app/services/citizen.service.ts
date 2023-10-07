import { Injectable } from '@angular/core';
import {Citizen} from "../models/citizen";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, firstValueFrom, tap} from "rxjs";
import {AllocationRequest} from "../models/allocationRequest";

@Injectable({
  providedIn: 'root'
})
export class CitizenService {

  citizensPath: string = '/assets/data/citizens.json';
  citizenPath: string = '/assets/data/citizen.json';
  citizens: Citizen[] = [] as Citizen[];
  citizen: Citizen = {} as Citizen // sarà usato per caricare le info del cittadino nella schermata delle sue info

  baseUrl:string = "http://localhost:8082/api/citizen/";


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

  addCitizen(citizen: Citizen) {
    console.log(citizen)

    return firstValueFrom(this.http.post(this.baseUrl + 'add', citizen, this.httpOptions).pipe(
      tap(response => {
        console.log('Richiesta POST riuscita:', response);
        // Gestisci la risposta dal server qui, se necessario
      }),
      catchError(error => {
        console.error('Errore durante la richiesta POST:', error);
        // Gestisci l'errore qui, se necessario
        throw error; // Rilancia l'errore come promessa respinta
      })
    ));
  }

  loadCitizens() {
    return firstValueFrom(this.http.get(this.baseUrl, this.httpOptions).pipe(
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
  /*
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
  */

  /*
  loadCitizen(citizenId: string) {
    return firstValueFrom(this.http.get(this.citizenPath).pipe(
      tap((response: any) => {
        console.log('Richiesta GET riuscita:', response);
        this.citizen = response

      }),
      catchError(error => {
        console.error('Errore durante la richiesta POST:', error);
        throw error; // Rilancia l'errore come promessa respinta
      })
    ));
  }
   */
  loadCitizen(citizenId: string) {
    return firstValueFrom(this.http.get(this.baseUrl + citizenId, this.httpOptions).pipe(
      tap((response: any) => {
        console.log('Richiesta GET riuscita:', response);
        this.citizen = response

      }),
      catchError(error => {
        console.error('Errore durante la richiesta POST:', error);
        throw error; // Rilancia l'errore come promessa respinta
      })
    ));
  }

  getCitizenId(userId: string) {
    return firstValueFrom(this.http.get(this.baseUrl + "user/" + userId, this.httpOptions).pipe(
      tap((response: any) => {
        console.log('Richiesta GET riuscita:', response);

      }),
      catchError(error => {
        console.error('Errore durante la richiesta POST:', error);
        throw error; // Rilancia l'errore come promessa respinta
      })
    ));
  }
}
