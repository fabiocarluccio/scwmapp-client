import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SmartBinService} from "../../../services/smart-bin.service";
import {ExceptionManagerService} from "../../../services/exception-manager.service";
import {SmartBin} from "../../../models/smartbin";
import {SmartBinRequestService} from "../../../services/smart-bin-request.service";
import {AllocationRequest} from "../../../models/allocationRequest";

@Component({
  selector: 'app-smartbin-allocation-municipal-office',
  templateUrl: './smart-bin-allocation-municipal-office.component.html',
  styleUrls: ['./smart-bin-allocation-municipal-office.component.scss']
})
export class SmartBinAllocationMunicipalOfficeComponent implements OnInit, AfterViewInit {


  smartBins: SmartBin[] = []
  newSmartBin: SmartBin = {} as SmartBin;

  smartBinRequests: AllocationRequest[] = []

  showRequestForm = false

  constructor(private http: HttpClient,
              public smartBinService: SmartBinService,
              public smartBinRequestService: SmartBinRequestService,
              private exceptionManager: ExceptionManagerService) {
  }

  ngOnInit(): void {
    this.smartBinService.loadBins().then(response => {

      this.smartBins = this.smartBinService.smartBins                             // load smartbins

      this.smartBinRequestService.loadRequests().then(response => {

        this.smartBinRequests = this.smartBinRequestService.smartBinRequests      // load allocation requests

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
    /*if(this.markerService.markers.length != 1) {
      console.log("dio1")
    } else {
      console.log(this.markerService.markers.length)
    }*/

    //this.mapComponent.setFocus(1,1)
  }


  locateSmartBin(smartbin: SmartBin) {
    console.log(smartbin.position)
    //this.moveMapToNewCenter()
  }

  moveMapToNewCenter(): void {
    //const newCenter: L.LatLngExpression = [42, -71]; // Nuove coordinate in cui spostare il centro
    //this.map.setView(newCenter, 10); // Cambia il centro della mappa alle nuove coordinate
  }

  handleMarkerUpdate(showRequestForm: boolean) {
    this.showRequestForm = showRequestForm
  }

}