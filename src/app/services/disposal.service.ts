import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, firstValueFrom, tap} from "rxjs";
import {Disposal} from "../models/disposal";
import {HostConfigService} from "./host-config.service";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class DisposalService {

  disposalsPath: string = '/assets/data/disposals.json';
  //disposalPath: string = '/assets/data/disposal.json';
  disposals: Disposal[] = [] as Disposal[];
  //disposal: Disposal = {} as Disposal

  //localhost:8083/api/disposal/metrics/651effb337d6e9236b121340/performance/2023
  baseUrl:string = '';//"http://localhost:8083/api/disposal/";

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
    this.baseUrl = hostConfigService.DISPOSALMS_BASEURL
  }


  loadWasteMetricsForYear(year: number) {
    return firstValueFrom(this.http.get(this.baseUrl + 'metrics/year/' + year, this.httpOptions).pipe(
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
  loadWasteMetrics(citizenId: string) {
    return firstValueFrom(this.http.get(this.baseUrl + 'metrics/citizen/' + citizenId, this.httpOptions).pipe(
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
  loadLastDisposals(citizenId: string) {
    return firstValueFrom(this.http.get(this.baseUrl + 'citizen/' + citizenId + '/last/4', this.httpOptions).pipe(
      tap((response: any) => {
        console.log('Richiesta GET riuscita:', response);
        this.disposals = response

      }),
      catchError(error => {
        console.error('Errore durante la richiesta POST:', error);
        if(error.status == "401") this.userService.logoutUser() // se token jwt è scaduto, o è non autenticato
        if(error.status == "403") this.userService.goToRoot() // se token jwt è scaduto, o è non autenticato
        throw error; // Rilancia l'errore come promessa respinta
      })
    ));
  }
  /*loadLastDisposals(citizenId: string) {
    return firstValueFrom(this.http.get(this.disposalsPath).pipe(
      tap((response: any) => {
        console.log('Richiesta GET riuscita:', response);
        this.disposals = response

      }),
      catchError(error => {
        console.error('Errore durante la richiesta POST:', error);
        throw error; // Rilancia l'errore come promessa respinta
      })
    ));
  }*/

  /*
  loadDisposals(citizenId: string) {
    return firstValueFrom(this.http.get(this.disposalsPath).pipe(
      tap((response: any) => {
        console.log('Richiesta GET riuscita:', response);
        this.disposals = response

      }),
      catchError(error => {
        console.error('Errore durante la richiesta POST:', error);
        throw error; // Rilancia l'errore come promessa respinta
      })
    ));
  }*/
  loadDisposals(citizenId: string) {
    return firstValueFrom(this.http.get(this.baseUrl + 'citizen/' + citizenId, this.httpOptions).pipe(
      tap((response: any) => {
        console.log('Richiesta GET riuscita:', response);

        if (response == null)
          this.disposals = []
        else
          this.disposals = response

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
