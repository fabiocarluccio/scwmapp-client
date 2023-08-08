import { Component } from '@angular/core';

@Component({
  selector: 'app-request-item-card',
  templateUrl: './request-item-card.component.html',
  styleUrls: ['./request-item-card.component.scss']
})
export class RequestItemCardComponent {

  showMapView = false

  toggleMapView() {
    console.log("mostro/nascondo la mappa relativa alla richiesta")
    this.showMapView = !this.showMapView
  }
}
