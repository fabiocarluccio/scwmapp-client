import {GeoJSON} from "leaflet";

export interface SmartBin {
  id?: string
  name?: string
  type?: string
  location?: GeoJSON

  current_capacity?: string
  total_capacity?: string
}
