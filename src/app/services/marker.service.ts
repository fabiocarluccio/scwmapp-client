import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as L from 'leaflet';
import {SmartBinService} from "./smart-bin.service";
import {PopupService} from "./popup.service";

@Injectable()
export class MarkerService {

  public markers: L.Marker[] = []; // Array per memorizzare i marker aggiunti


  constructor(private http: HttpClient,
              private popupService: PopupService,
              private smartBinService: SmartBinService) {}

  static scaledRadius(val: number, maxVal: number): number {
    if(20 * (val / maxVal) < 8) {
        return 8;
    }
    return 20 * (val / maxVal);
  }


  makeBinCircleMarkers(map: L.Map): void {
    this.smartBinService.loadAllocatedBins().then(response => {
      for (const bin of response) {
        const lon = bin.position.coordinates[0];
        const lat = bin.position.coordinates[1];

        const circleOptions: L.CircleMarkerOptions = {
          color: this.smartBinService.getWasteColorByName(bin.type),
          opacity: 0.8,
          fillColor: this.smartBinService.getWasteColorByName(bin.type),
          fillOpacity: 0.4, //0.2,
          radius: MarkerService.scaledRadius(bin.currentCapacity, bin.totalCapacity),
          weight: 4
        };
        const circle = L.circleMarker([lat, lon], circleOptions);

        circle.bindPopup(this.popupService.makeBinPopup(bin));

        circle.addTo(map);
      }
    })
  }

  /*
  getColor(type: string): string {
    switch (type) {
      case 'Vetro': return 'green'
      case 'Indifferenziata': return 'black'
      case 'Plastica': return 'purple'
      default: return 'blue'
    }
  }*/
}
