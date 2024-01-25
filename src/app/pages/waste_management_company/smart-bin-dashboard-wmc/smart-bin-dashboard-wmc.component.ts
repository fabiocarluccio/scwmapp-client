import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {SmartBin} from "../../../models/smartbin";
import {AllocationRequest} from "../../../models/allocationRequest";
import {HttpClient} from "@angular/common/http";
import {SmartBinService} from "../../../services/smart-bin.service";
import {SmartBinRequestService} from "../../../services/smart-bin-request.service";
import {ExceptionManagerService} from "../../../services/exception-manager.service";
import {Subscription} from "rxjs";
import {Message} from "@stomp/stompjs";
import {CleaningPath} from "../../../models/cleaning-path";
import {Router} from "@angular/router";

@Component({
  selector: 'app-smart-bin-dashboard-wmc',
  templateUrl: './smart-bin-dashboard-wmc.component.html',
  styleUrls: ['./smart-bin-dashboard-wmc.component.scss']
})
export class SmartBinDashboardWmcComponent implements OnInit, AfterViewInit {

  programmedDate: string = ""
  programmedTime = "06:00"
  //private subscription: Subscription = new Subscription();

  waitingForSmartBinsList = true
  waitingForSmartBinRequestsList = true
  waitingForCleaningPathsList = true
  loadSmartBinsError = false
  loadSmartBinRequestsError = false
  loadCleaningPathsError = false
  //smartBins: SmartBin[] = []

  get smartBinsSorted(): SmartBin[] { // inutile questo nel caso in cui non si inserisce filtraggio/ordinamento
    //this.sortBins();
    //return this.smartBins;
    return this.smartBinService.smartBins;
  }


  get smartBinsOverThreshold(): SmartBin[] {
    const smartBins = this.smartBinService.smartBins
    const filteredSmartBins = smartBins.filter((smartBin) => smartBin.currentCapacity!/smartBin.totalCapacity! >= smartBin.capacityThreshold!)
    return filteredSmartBins;
  }
  get smartBinsUnderThreshold(): SmartBin[] {
    const smartBins = this.smartBinService.smartBins
    const filteredSmartBins = smartBins.filter((smartBin) => smartBin.currentCapacity!/smartBin.totalCapacity! < smartBin.capacityThreshold!)
    return filteredSmartBins;
  }


  //smartBinRequests: AllocationRequest[] = []

  cleaningMode = false
  smartBinCleaningPath: SmartBin[] = []

  constructor(private http: HttpClient,
              public smartBinService: SmartBinService,
              public smartBinRequestService: SmartBinRequestService,
              private router: Router,
              private exceptionManager: ExceptionManagerService) {

    this.programmedDate = this.getTomorrowDate()

  }



  ngOnInit(): void {
    // Check Token JWT - se non è definito, lo redirigo nella pagina di login
    if(localStorage.getItem("currentUser") == null) {
      this.router.navigateByUrl("/")
      return
    }

    this.smartBinService.loadAllocatedBins().then(response => {
      //this.smartBins = this.smartBinService.smartBins                             // load smartbins
      this.waitingForSmartBinsList = false

      this.smartBinRequestService.loadPendingRequests().then(response => {
        //this.smartBinRequests = this.smartBinRequestService.smartBinRequests      // load allocation requests
        this.waitingForSmartBinRequestsList = false

        this.smartBinService.loadCleaningPathList().then(response => {              // load cleaning path list
          this.waitingForCleaningPathsList = false
        }).catch(error => {
          // Mostro errore
          this.waitingForCleaningPathsList = false
          this.loadCleaningPathsError = true
          //window.alert(this.exceptionManager.getExceptionMessage(error.error.name, "A", error.error.description));
        });
      }).catch(error => {
        // Mostro errore
        this.waitingForSmartBinRequestsList = false
        this.loadSmartBinRequestsError = true
        //window.alert(this.exceptionManager.getExceptionMessage(error.error.name, "A", error.error.description));
      });
    }).catch(error => {
      // Mostro errore
      this.waitingForSmartBinsList = false
      this.loadSmartBinsError = true
      //window.alert(this.exceptionManager.getExceptionMessage(error.error.name, "A", error.error.description));
    });
  }


  ngAfterViewInit(): void {
  }

  toggleCleaningMode() {
    this.cleaningMode = !this.cleaningMode
    this.smartBinCleaningPath = []
  }

  handleSelectionEvent(smartBin: SmartBin) {

    if (this.smartBinCleaningPath.indexOf(smartBin) != -1) {
      this.smartBinCleaningPath = this.smartBinCleaningPath.filter(item => item !== smartBin)
    } else {
      this.smartBinCleaningPath.push(smartBin)
    }

    console.log(this.smartBinCleaningPath)
  }

  getSelectionOrder(smartBin: SmartBin) {
    return this.smartBinCleaningPath.indexOf(smartBin)
  }

  executeCleaningPath() {
    this.insertNewCleaningPath()
    this.toggleCleaningMode()
  }

  insertNewCleaningPath() {

    // Aggiunta percorso pulizia
    this.smartBinService.addCleaningPath(this.smartBinCleaningPath, this.programmedDate, this.programmedTime).then(response => {
      this.smartBinService.loadCleaningPathList()
    })
    .catch(error => {
      // Mostro errore
      window.alert(this.exceptionManager.getExceptionMessage(error.error.name, "A", error.error.description));
    });

  }



  getTomorrowDate() {
    const oggi = new Date();
    const domani = new Date(oggi);
    domani.setDate(oggi.getDate() + 1);

    const anno = domani.getFullYear();
    const mese = String(domani.getMonth() + 1).padStart(2, "0");
    const giorno = String(domani.getDate()).padStart(2, "0");
    return `${anno}-${mese}-${giorno}`;
  }
}
