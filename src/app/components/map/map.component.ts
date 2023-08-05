import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import {MarkerService} from "../../services/marker.service";

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  private map: any;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 40.0017, 18.42517 ],
      zoom: 17
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  constructor(private markerService: MarkerService) { }

  ngAfterViewInit(): void {
    this.initMap();

    this.markerService.makeBinCircleMarkers(this.map);

    this.addMapClickEvent();
  }

  private addMapClickEvent(): void {
    this.map.on('click', (event: L.LeafletMouseEvent) => {
      const lat = event.latlng.lat;
      const lng = event.latlng.lng;

      if(this.markerService.markers.length == 0) {
        // Rimuovi tutti i marker esistenti
        this.removeMarkers();

        this.addMarker([lat, lng]);
      } else {
        // Rimuovi tutti i marker esistenti
        this.removeMarkers();
      }
    });
  }

  private addMarker(latlng: L.LatLngTuple): void {
    const marker = L.marker(latlng).addTo(this.map);
    this.markerService.markers.push(marker); // Aggiungi il marker all'array
  }

  private removeMarkers(): void {
    for (const marker of this.markerService.markers) {
      this.map.removeLayer(marker); // Rimuovi il marker dalla mappa
    }
    this.markerService.markers = []; // Svuota l'array dei marker
  }

  public setFocus(lat: number, lng: number) {
    this.map = L.map('map', {
      center: [ lat, lng ],
      zoom: 17
    });
  }
}
