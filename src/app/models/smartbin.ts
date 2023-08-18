
export interface SmartBin {
  id?: string
  name?: string
  type?: string
  position?: GeoJSON

  currentCapacity?: number
  totalCapacity?: number
}

interface GeoJSON {
  type: string;
  coordinates: [number, number];
}
