import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SmartBin} from "../models/smartbin";
import {catchError, firstValueFrom, tap} from "rxjs";
import {AllocationRequest} from "../models/allocationRequest";
import {WasteType} from "../models/wasteType";
import {CommunicationService} from "./communication.service";

@Injectable({
  providedIn: 'root'
})
export class SmartBinService {

  path: string = '/assets/data/smartbins.json';
  smartBins: SmartBin[] = [] as SmartBin[];
  allocationRequests: AllocationRequest[] = [] as AllocationRequest[];
  wasteTypes: WasteType[] = [] as WasteType[];

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':''
    })
  }

  baseUrl:string = "http://localhost:8081/api/smartbin/";

  constructor(private http: HttpClient) { }

  loadAllocatedBins() {
    return firstValueFrom(this.http.get(this.baseUrl + 'state?state=ALLOCATED').pipe(
      tap((response: any) => {
        console.log('Richiesta GET riuscita:', response);
        this.smartBins = response


      }),
      catchError(error => {
        console.error('Errore durante la richiesta POST:', error);
        throw error; // Rilancia l'errore come promessa respinta
      })
    ));
  }

  loadWasteTypes() {

    return firstValueFrom(this.http.get(this.baseUrl + 'type/', this.httpOptions).pipe(
      tap(response => {
        console.log('Richiesta GET riuscita:', response);
        this.wasteTypes = response as WasteType[]

        console.log(response)
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
