import { Injectable } from '@angular/core';
import {Citizen} from "../models/citizen";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, firstValueFrom, tap} from "rxjs";
import {AllocationRequest} from "../models/allocationRequest";
import {HostConfigService} from "./host-config.service";
import {Router} from "@angular/router";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class CitizenService {

  citizensPath: string = '/assets/data/citizens.json';
  citizenPath: string = '/assets/data/citizen.json';
  citizens: Citizen[] = [] as Citizen[];

  baseUrl:string = '';//"http://localhost:8082/api/citizen/";


  private _httpOptions: any

  get httpOptions() {
    this._httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
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
    this.baseUrl = hostConfigService.CITIZENMS_BASEURL
  }

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
        if(error.status == "401") this.userService.logoutUser() // se token jwt è scaduto, o è non autenticato
        if(error.status == "403") this.userService.goToRoot() // se token jwt è scaduto, o è non autenticato
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

        if(error.status == "401") this.userService.logoutUser() // se token jwt è scaduto, o è non autenticato
        if(error.status == "403") this.userService.goToRoot() // se token jwt è scaduto, o è non autenticato
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
        localStorage.setItem("citizen", JSON.stringify(response))
      }),
      catchError(error => {
        console.error('Errore durante la richiesta POST:', error);
        if(error.status == "401") this.userService.logoutUser() // se token jwt è scaduto, o è non autenticato
        if(error.status == "403") this.userService.goToRoot() // se token jwt è scaduto, o è non autenticato
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
        if(error.status == "401") this.userService.logoutUser() // se token jwt è scaduto, o è non autenticato
        if(error.status == "403") this.userService.goToRoot() // se token jwt è scaduto, o è non autenticato
        throw error; // Rilancia l'errore come promessa respinta
      })
    ));
  }
}
