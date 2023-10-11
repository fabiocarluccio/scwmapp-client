import { Injectable } from '@angular/core';
import {AllocationRequest} from "../models/allocationRequest";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, firstValueFrom, pipe, tap} from "rxjs";
import {HostConfigService} from "./host-config.service";

@Injectable({
  providedIn: 'root'
})
export class SmartBinRequestService {

  path: string = '/assets/data/allocation_requests.json';
  baseUrl:string = '';//"http://localhost:8081/api/smartbin/";

  smartBinRequests: AllocationRequest[] = [] as AllocationRequest[];

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
              private hostConfigService: HostConfigService) {
    this.baseUrl = hostConfigService.SMARTBINMS_BASEURL
  }

  sendAllocationRequest(allocationRequest: AllocationRequest) {
    console.log(allocationRequest)
    //return null!
    return firstValueFrom(this.http.post(this.baseUrl + 'request/allocation', allocationRequest, this.httpOptions).pipe(
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

  loadPendingRequests() {
    /*return firstValueFrom(this.http.get(this.path).pipe(*/
    console.log("there")
    return firstValueFrom(this.http.get(this.baseUrl + 'request/allocation?status=PENDING', this.httpOptions).pipe(
      tap((response: any) => {
        console.log('Richiesta GET pending request riuscita:', response);
        this.smartBinRequests = response
      }),
      catchError(error => {
        console.error('Errore durante la richiesta POST:', error);
        throw error; // Rilancia l'errore come promessa respinta
      })
    ));
  }

  acceptRequest(allocationRequest: AllocationRequest) {

    return firstValueFrom(this.http.post(this.baseUrl + 'request/allocation/approve/' + allocationRequest.id, {}, this.httpOptions).pipe(
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

  disapproveRequest(allocationRequest: AllocationRequest) {
    return firstValueFrom(this.http.post(this.baseUrl + 'request/allocation/disapprove/' + allocationRequest.id, {}, this.httpOptions).pipe(
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

  getBinTypeColor(type: string): string {
    switch(type) {
      case "Indifferenziata": return "black";
      case "Vetro": return "green"
      default: return "purple";
    }
  }
}
