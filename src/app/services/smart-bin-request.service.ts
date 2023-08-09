import { Injectable } from '@angular/core';
import {SmartBin} from "../models/smartbin";
import {AllocationRequest} from "../models/allocationRequest";
import {HttpClient} from "@angular/common/http";
import {catchError, firstValueFrom, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SmartBinRequestService {

  path: string = '/assets/data/allocation_requests.json';
  smartBinRequests: AllocationRequest[] = [] as AllocationRequest[];

  constructor(private http: HttpClient) { }

  loadRequests() {
    return firstValueFrom(this.http.get(this.path).pipe(
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

  getBinTypeColor(type: string): string {
    switch(type) {
      case "Indifferenziata": return "black";
      case "Vetro": return "green"
      default: return "purple";
    }
  }
}
