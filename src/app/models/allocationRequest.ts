
export interface AllocationRequest {
  id?: string
  smartBinName?: string
  type?: string
  position?: GeoJSON

  totalCapacity?: string

  "status"?: string
  "requestedDate"?: string
  "decisionDate"?: string
}

interface GeoJSON {
  type: string;
  coordinates: [number, number];
}
