import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SmartBin} from "../../../models/smartbin";
import {AllocationRequest} from "../../../models/allocationRequest";
import {HttpClient} from "@angular/common/http";
import {SmartBinService} from "../../../services/smart-bin.service";
import {SmartBinRequestService} from "../../../services/smart-bin-request.service";
import {ExceptionManagerService} from "../../../services/exception-manager.service";

@Component({
  selector: 'app-smart-bin-dashboard-wmc',
  templateUrl: './smart-bin-dashboard-wmc.component.html',
  styleUrls: ['./smart-bin-dashboard-wmc.component.scss']
})
export class SmartBinDashboardWmcComponent implements OnInit, AfterViewInit {

  smartBins: SmartBin[] = []
  get smartBinsSorted(): SmartBin[] {
    this.sortBins();
    return this.smartBins;
  }

  smartBinRequests: AllocationRequest[] = []

  cleaningMode = false
  smartBinCleaningPath: SmartBin[] = []

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
    this.cleanPath()
    this.toggleCleaningMode()
  }

  cleanPath() { // TODO - Da riaggiornare con comunicazione con MS

    for (const smartBin of this.smartBins) {
      if (this.smartBinCleaningPath.includes(smartBin)) {
        smartBin.currentCapacity = 0
        // TODO - come aggiorno la mappa?
      }
    }

  }

  private sortBins() {
    // La funzione per ordinare gli SmartBin
    this.smartBins.sort((a, b) => b.currentCapacity! - a.currentCapacity!);
  }

}
