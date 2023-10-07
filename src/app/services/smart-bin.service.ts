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
  //wasteTypes: WasteType[] = [] as WasteType[];

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

  baseUrl:string = "http://localhost:8081/api/smartbin/";

  constructor(private http: HttpClient) { }

  loadAllocatedBins() {
    return firstValueFrom(this.http.get(this.baseUrl + 'state?state=ALLOCATED', this.httpOptions).pipe(
      tap((response: any) => {
        console.log('Richiesta GET riuscita:', response);
        this.smartBins = response
        // ordino per percentuale di capienza
        if(this.smartBins != null)
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
      tap((response: any) => {
        console.log('Richiesta GET riuscita:', response);
        let wasteTypes = response as WasteType[]

        // metto in testa la tipologia "Indifferenziata"
        let types = wasteTypes.filter((wasteType) => wasteType.name != "Indifferenziata")
        types.unshift(wasteTypes.filter(wasteType => wasteType.name == "Indifferenziata")[0])

        localStorage.setItem("wasteTypes", JSON.stringify(types))
        //console.log(response)
      }),
      catchError(error => {
        console.error('Errore durante la richiesta POST:', error);
        throw error; // Rilancia l'errore come promessa respinta
      })
    ));
  }


  getWasteColorByName(wasteName: string): string {
    // si da per scontato che l'array delle tipologie sia già stato scaricato
    let type = this.getWasteTypes().filter(type => type.name === wasteName)
    if (type.length == 1) {
      return type[0].color
    }

    return "purple"
  }
  /*
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
*/
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


  getWasteTypes(){
    let wasteTypes: WasteType[] = JSON.parse(localStorage.getItem("wasteTypes")!)
    return wasteTypes
  }

}
