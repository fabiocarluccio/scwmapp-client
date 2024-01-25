import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SmartBinService} from "../../../services/smart-bin.service";
import {ExceptionManagerService} from "../../../services/exception-manager.service";
import {SmartBin} from "../../../models/smartbin";
import {SmartBinRequestService} from "../../../services/smart-bin-request.service";
import {AllocationRequest} from "../../../models/allocationRequest";
import {WasteType} from "../../../models/wasteType";
import {CommunicationService} from "../../../services/communication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-smartbin-allocation-municipal-office',
  templateUrl: './smart-bin-allocation-municipal-office.component.html',
  styleUrls: ['./smart-bin-allocation-municipal-office.component.scss']
})
export class SmartBinAllocationMunicipalOfficeComponent implements OnInit, AfterViewInit {


  smartBins: SmartBin[] = []
  newRequest: AllocationRequest = {} as AllocationRequest;
  wasteTypes: WasteType[] = []

  //smartBinRequests: AllocationRequest[] = []

  showRequestForm = false

  waitingForSmartBinsList = true
  waitingForSmartBinRequestsList = true
  loadSmartBinsError = false
  loadSmartBinRequestsError = false

  //wasteTypes: WasteType[] = [] as WasteType[];

  constructor(private http: HttpClient,
              public smartBinService: SmartBinService,
              public smartBinRequestService: SmartBinRequestService,
              private exceptionManager: ExceptionManagerService,
              private communicationService: CommunicationService,
              private router: Router) {
  }


  get smartBinsOverThreshold(): SmartBin[] {
    const smartBins = this.smartBins
    const filteredSmartBins = smartBins.filter((smartBin) => smartBin.currentCapacity!/smartBin.totalCapacity! >= smartBin.capacityThreshold!)
    return filteredSmartBins;
  }
  get smartBinsUnderThreshold(): SmartBin[] {
    const smartBins = this.smartBins
    const filteredSmartBins = smartBins.filter((smartBin) => smartBin.currentCapacity!/smartBin.totalCapacity! < smartBin.capacityThreshold!)
    return filteredSmartBins;
  }

  ngOnInit(): void {

    // Check Token JWT - se non è definito, lo redirigo nella pagina di login
    if(localStorage.getItem("currentUser") == null) {
      this.router.navigateByUrl("/")
      return
    }

    // Load waste types
    this.wasteTypes = this.smartBinService.getWasteTypes()

    // Load SmartBins list
    this.smartBinService.loadAllocatedBins().then(response => {
      this.smartBins = this.smartBinService.smartBins                             // load smartbins
      this.waitingForSmartBinsList = false
    }).catch(error => {
      // Mostro errore
      this.waitingForSmartBinsList = false
      this.loadSmartBinsError = true
      //old_ window.alert(this.exceptionManager.getExceptionMessage(error.error.code, "A"));
    });

    // Load SmartBin Requests list
    this.smartBinRequestService.loadPendingRequests().then(response => {
      this.waitingForSmartBinRequestsList = false
      //this.smartBinRequests = this.smartBinRequestService.smartBinRequests    // load allocation requests
    }).catch(error => {
      // Mostro errore
      this.waitingForSmartBinRequestsList = false
      this.loadSmartBinRequestsError = true
      //old_ window.alert(this.exceptionManager.getExceptionMessage(error.error.code, "A"));
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
        // aggiungo richiesta in lista
        console.log(this.newRequest)
        this.smartBinRequestService.loadPendingRequests()
        //this.smartBinRequests.unshift(this.newRequest)

        // Reimposto i campi e rimuovo marker
        this.newRequest = {} as AllocationRequest;
        this.showRequestForm = false
        this.communicationService.sendMessage('Message: remove marker');
      })
      .catch(error => {
        // Mostro errore
        //old_ window.alert(this.exceptionManager.getExceptionMessage(error.error.code, "A"));
        console.log(error.error)
        window.alert(this.exceptionManager.getExceptionMessage(error.error.name, "A", error.error.description));
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
