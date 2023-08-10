import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as L from 'leaflet';
import {SmartBinService} from "./smart-bin.service";
import {PopupService} from "./popup.service";
import {LatLngExpression} from "leaflet";

@Injectable()
export class MarkerService {

  public markers: L.Marker[] = []; // Array per memorizzare i marker aggiunti


  constructor(private http: HttpClient,
              private popupService: PopupService,
              private smartBinService: SmartBinService) {

  }

  static scaledRadius(val: number, maxVal: number): number {
    if(20 * (val / maxVal) < 8) {
        return 8;
    }
    return 20 * (val / maxVal);
  }


  makeBinCircleMarkers(map: L.Map): void {
    this.smartBinService.loadBins().then(response => {
      for (const bin of response) {
        const lon = bin.position.coordinates[0];
        const lat = bin.position.coordinates[1];

        const circleOptions: L.CircleMarkerOptions = {
          color: this.getColor(bin.type), // Imposta il colore del cerchio su rosso
          opacity: 0.8,
          fillColor: this.getColor(bin.type),
          fillOpacity: 0.4, //0.2,
          radius: MarkerService.scaledRadius(bin.currentCapacity, bin.totalCapacity),//6, // Imposta il raggio del cerchio a 6 (o qualsiasi altro valore desiderato)
          weight: 4
        };
        const circle = L.circleMarker([lat, lon], circleOptions);

        circle.bindPopup(this.popupService.makeBinPopup(bin));

        circle.addTo(map);
      }
    })
  }

  getColor(type: string): string {
    switch (type) {
      case 'Vetro': return 'green'
      case 'Indifferenziata': return 'black'
      case 'Plastica': return 'purple'
      default: return 'blue'
    }
  }
}
