import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SmartBinService} from "../../../services/smart-bin.service";
import {ExceptionManagerService} from "../../../services/exception-manager.service";
import {SmartBin} from "../../../models/smartbin";
import {SmartBinRequestService} from "../../../services/smart-bin-request.service";
import {AllocationRequest} from "../../../models/allocationRequest";
import {WasteType} from "../../../models/wasteType";
import {GeoJSON} from "leaflet";

@Component({
  selector: 'app-smartbin-allocation-municipal-office',
  templateUrl: './smart-bin-allocation-municipal-office.component.html',
  styleUrls: ['./smart-bin-allocation-municipal-office.component.scss']
})
export class SmartBinAllocationMunicipalOfficeComponent implements OnInit, AfterViewInit {


  smartBins: SmartBin[] = []
  newRequest: AllocationRequest = {} as AllocationRequest;

  smartBinRequests: AllocationRequest[] = []

  showRequestForm = false

  wasteTypes: WasteType[] = [] as WasteType[];

  constructor(private http: HttpClient,
              public smartBinService: SmartBinService,
              public smartBinRequestService: SmartBinRequestService,
              private exceptionManager: ExceptionManagerService) {
  }

  ngOnInit(): void {
    this.smartBinService.loadAllocatedBins().then(response => {

      this.smartBins = this.smartBinService.smartBins                             // load smartbins

      this.smartBinRequestService.loadPendingRequests().then(response => {

        this.smartBinRequests = this.smartBinRequestService.smartBinRequests      // load allocation requests

          this.smartBinService.loadWasteTypes().then(response => {

            this.wasteTypes = this.smartBinService.wasteTypes                     // load waste types

          }).catch(error => {
            // Mostro errore
            window.alert(this.exceptionManager.getExceptionMessage(error.error.code, "A"));
          });
        }).catch(error => {
          // Mostro errore
          window.alert(this.exceptionManager.getExceptionMessage(error.error.code, "A"));
        });
    }).catch(error => {
      // Mostro errore
      window.alert(this.exceptionManager.getExceptionMessage(error.error.code, "A"));
    });
  }

  ngAfterViewInit(): void {

  }

  highlightBinItem(binId: string) {
    // Trova l'elemento del terzo div da evidenziare
    const highlightedDiv = document.getElementById(binId)!;

    // Aggiungi una classe CSS temporanea per l'evidenziazione
    highlightedDiv.classList.add('highlighted');

    // Imposta lo scroll dell'elemento in modo che sia visibile
    highlightedDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Rimuovi la classe dopo 1 secondo per tornare allo stato normale
    setTimeout(() => {
      highlightedDiv.classList.remove('highlighted');
    }, 1000);
  }

  allocateNewBin() {
    console.log(JSON.stringify(this.newRequest))


    this.smartBinRequestService.sendAllocationRequest(this.newRequest)
      .then(response => {
        console.log(response)

      })
      .catch(error => {
        // Mostro errore
        window.alert(this.exceptionManager.getExceptionMessage(error.error.code, "A"));
      });
  }


  locateSmartBin(smartbin: SmartBin) {
    console.log(smartbin.position)
    //this.moveMapToNewCenter()
  }

  moveMapToNewCenter(): void {
    //const newCenter: L.LatLngExpression = [42, -71]; // Nuove coordinate in cui spostare il centro
    //this.map.setView(newCenter, 10); // Cambia il centro della mappa alle nuove coordinate
  }

  /*
  * event[0]: boolean <- indica se bisogna mostrare o meno il form di richiesta allocazione
  * event[1]: [lat, long] <- indica la posizione selezionata sulla mappa, qualora event[0] sia true
  */
  handleMarkerUpdate(event: any) {
    this.showRequestForm = event[0]
    this.newRequest.position = {
      type: 'Point',
      coordinates: event[1]
    };

    if(!this.showRequestForm) { // resetto i campi del form
      this.newRequest = {} as AllocationRequest
    }

  }



}
