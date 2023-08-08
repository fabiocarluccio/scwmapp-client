import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import * as L from 'leaflet';
import {MarkerService} from "../../../services/marker.service";
import {GeoJSON, LatLngExpression} from "leaflet";

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
  styleUrls: ['./map.component.scss'],
  providers: [MarkerService]
})
export class MapComponent implements AfterViewInit {
  @Input() mapId!: string; //SmartBinsMap | RequestMap3289183 | RequestMap128491
  @Input() focusLocation: LatLngExpression | undefined;

  @Output() markerEvent = new EventEmitter<any>();


  private map: any;

  private initMap(): void {
    if(typeof this.focusLocation === 'undefined') {
      this.focusLocation = [ 40.0017, 18.42517 ]
    }

    if(this.mapId == "SmartBinsMap") {
      this.map = L.map(this.mapId, {
        center: this.focusLocation,
        zoom: 17
      });
    } else {
      this.map = L.map(this.mapId, {
        center: this.focusLocation,
        dragging: false,
        scrollWheelZoom: false,
        zoomControl: false,
        zoom: 17
      });
    }

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

    if(this.mapId == "SmartBinsMap") { // inserisco markers posizione smartbins attivi
      this.markerService.makeBinCircleMarkers(this.map);
      this.addMapClickEvent();
    } else { // inserisco marker posizione richiesta allocazione
      const marker = L.marker(this.focusLocation!).addTo(this.map);
      this.markerService.markers.push(marker);
    }

  }

  private addMapClickEvent(): void {
    this.map.on('click', (event: L.LeafletMouseEvent) => {
      const lat = event.latlng.lat;
      const lng = event.latlng.lng;

      if(this.markerService.markers.length == 0) {
        // Rimuovi tutti i marker esistenti
        this.removeMarkers();
        this.addMarker([lat, lng]);
        this.markerEvent.emit(true);
      } else {
        // Rimuovi tutti i marker esistenti
        this.removeMarkers();
        this.markerEvent.emit(false);
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
