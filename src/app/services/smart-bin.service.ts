import {Host, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SmartBin} from "../models/smartbin";
import {catchError, firstValueFrom, tap} from "rxjs";
import {AllocationRequest} from "../models/allocationRequest";
import {WasteType} from "../models/wasteType";
import {CommunicationService} from "./communication.service";
import {HostConfigService} from "./host-config.service";
import {CleaningPath} from "../models/cleaning-path";

@Injectable({
  providedIn: 'root'
})
export class SmartBinService {

  path: string = '/assets/data/smartbins.json';
  baseUrl:string = '';//"http://localhost:8081/api/smartbin/";
  baseUrlCleaningPath: string = '';
  smartBins: SmartBin[] = [] as SmartBin[];
  allocationRequests: AllocationRequest[] = [] as AllocationRequest[];
  cleaningPathList: CleaningPath[] = [] as CleaningPath[];
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



  constructor(private http: HttpClient,
              private hostConfigService: HostConfigService) {
    this.baseUrl = hostConfigService.SMARTBINMS_BASEURL
    this.baseUrlCleaningPath = hostConfigService. SMARTBINCleaningPathMS_BASEURL
  }

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

  addCleaningPath(smartBinCleaningPath: SmartBin[]) {

    // Creazione array cleaningPath
    const cleaningPath: string[]= []
    for (const smartBin of smartBinCleaningPath) {
      cleaningPath.push(smartBin.id!)
    }


    const body = {
      "smartBinIDPath": cleaningPath,
      "timestamp": new Date
    }

    return firstValueFrom(this.http.post(this.baseUrlCleaningPath + 'add', body, this.httpOptions).pipe(
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

  loadCleaningPathList() {
    return firstValueFrom(this.http.get(this.baseUrlCleaningPath + 'status?done=false', this.httpOptions).pipe(
      tap((response: any) => {
        console.log('Richiesta GET riuscita:', response);
        this.cleaningPathList = response as CleaningPath[]
      }),
      catchError(error => {
        console.error('Errore durante la richiesta POST:', error);
        throw error; // Rilancia l'errore come promessa respinta
      })
    ));
  }



}
