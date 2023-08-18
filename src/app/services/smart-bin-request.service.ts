import { Injectable } from '@angular/core';
import {AllocationRequest} from "../models/allocationRequest";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, firstValueFrom, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SmartBinRequestService {

  path: string = '/assets/data/allocation_requests.json';
  baseUrl:string = "http://localhost:8081/api/smartbin/";

  smartBinRequests: AllocationRequest[] = [] as AllocationRequest[];

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':''
    })
  }

  constructor(private http: HttpClient) { }

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
    return firstValueFrom(this.http.get(this.baseUrl + 'request/allocation?status=PENDING').pipe(
      tap((response: any) => {
        console.log('Richiesta GET riuscita:', response);
        this.smartBinRequests = response
      }),
      catchError(error => {
        console.error('Errore durante la richiesta POST:', error);
        throw error; // Rilancia l'errore come promessa respinta
      })
    ));
  }

  acceptRequest(allocationRequest: AllocationRequest) {
    return firstValueFrom(this.http.post(this.baseUrl + 'request/allocation/approve/' + allocationRequest.id, this.httpOptions).pipe(
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
    return firstValueFrom(this.http.post(this.baseUrl + 'request/allocation/disapprove/' + allocationRequest.id, this.httpOptions).pipe(
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
