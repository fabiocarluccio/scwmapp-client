import {Component, Input, Output} from '@angular/core';
import {AllocationRequest} from "../../../models/allocationRequest";
import {SmartBinRequestService} from "../../../services/smart-bin-request.service";
import {ExceptionManagerService} from "../../../services/exception-manager.service";
import {SmartBinService} from "../../../services/smart-bin.service";
import {SmartBin} from "../../../models/smartbin";
import {CommunicationService} from "../../../services/communication.service";

@Component({
  selector: 'app-request-item-card',
  templateUrl: './request-item-card.component.html',
  styleUrls: ['./request-item-card.component.scss']
})
export class RequestItemCardComponent {
  @Input() smartBinRequest!: AllocationRequest
  @Input() showDecisionControls = false

  showMapView = false


  constructor(public smartBinRequestService: SmartBinRequestService,
              public smartBinService: SmartBinService,
              public exceptionManagerService: ExceptionManagerService,
              private communicationService: CommunicationService) {

  }

  toggleMapView() {
    console.log("mostro/nascondo la mappa relativa alla richiesta")
    this.showMapView = !this.showMapView
  }

  revokeRequest() {
    this.smartBinRequestService.disapproveRequest(this.smartBinRequest)
      .then(response => {
        console.log(response)
        this.smartBinRequestService.smartBinRequests = this.smartBinRequestService.smartBinRequests
          .filter(allocationRequest => allocationRequest.id !== this.smartBinRequest.id);
      })
      .catch(error => {
        // Mostro errore
        window.alert(this.exceptionManagerService.getExceptionMessage(error.error.code, "A"));
      });

    console.log("deny")
  }

  acceptRequest() {
    this.smartBinRequestService.acceptRequest(this.smartBinRequest)
      .then(response => {
        console.log(response)

        this.smartBinService.loadAllocatedBins() // aggiorno lista bins ottenendola tramite API
        this.smartBinRequestService.smartBinRequests = this.smartBinRequestService.smartBinRequests
          .filter(allocationRequest => allocationRequest.id !== this.smartBinRequest.id);
        // comunico alla mappa di aggiornarsi
        this.communicationService.sendMessage('Message: update Smartbins map');

      })
      .catch(error => {
        // Mostro errore
        window.alert(this.exceptionManagerService.getExceptionMessage(error.error.code, "A"));
      });
    console.log('accept')
  }
}
