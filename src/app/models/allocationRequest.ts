
export interface AllocationRequest {
  id?: string
  smartBin_name?: string
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
