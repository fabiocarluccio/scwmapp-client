import {Component, Input} from '@angular/core';
import {AllocationRequest} from "../../../models/allocationRequest";
import {SmartBinRequestService} from "../../../services/smart-bin-request.service";

@Component({
  selector: 'app-request-item-card',
  templateUrl: './request-item-card.component.html',
  styleUrls: ['./request-item-card.component.scss']
})
export class RequestItemCardComponent {
  @Input() smartBinRequest!: AllocationRequest

  showMapView = false
  showDecisionControls = true

  constructor(public smartBinRequestService: SmartBinRequestService) { }

  toggleMapView() {
    console.log("mostro/nascondo la mappa relativa alla richiesta")
    this.showMapView = !this.showMapView
  }
}
