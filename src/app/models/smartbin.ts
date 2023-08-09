import {GeoJSON} from "leaflet";

export interface SmartBin {
  id?: string
  name?: string
  type?: string
  position?: GeoJSON

  currentCapacity?: number
  totalCapacity?: number
}
