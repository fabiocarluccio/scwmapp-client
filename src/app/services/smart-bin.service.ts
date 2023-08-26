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
        // ordino per percentuale di capienza
        this.smartBins = this.smartBins.sort((a, b) => b.currentCapacity! / b.totalCapacity! - a.currentCapacity! / a.totalCapacity!)

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

  getBinTypeColor(type: string): string { //TODO da rimuovere
    switch(type) {
      case "Indifferenziata": return "black";
      case "Vetro": return "green"
      default: return "purple";
    }
  }


  getWasteColorByName(wasteName: string): string {
    // 1. ricerca in array e restituire se esiste
    // 2. get tramite API dei tipi (nel caso in cui non sia stato ancora fatto) - approccio lazy
    // 3. ricerca (di nuovo) in array e restituire se esiste
    // 4. se non esiste, restituire purple
    let type = this.wasteTypes.filter(type => type.name === wasteName)
    if (type.length == 1) {
      return type[0].color
    }

    this.loadWasteTypes()

    type = this.wasteTypes.filter(type => type.name === wasteName)
    if (type.length == 1) {
      return type[0].color
    }

    return "purple"
  }

  addNewWasteType(wasteType: WasteType) {

    return firstValueFrom(this.http.post(this.baseUrl + 'type/add', wasteType, this.httpOptions).pipe(
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

}
