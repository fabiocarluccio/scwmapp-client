export interface Citizen {
  id?: string
  name?: string
  surname?: string
  ssn?: string
  address?: Address
  email?: string

  // non aggiunte da carmine
  token?: string
  taxesStatus?: boolean
  generatedVolume?: GeneratedVolume

}

export class Citizen {
  static getSeparationPerformance(citizen: Citizen): number {
    let mixedWaste = citizen.generatedVolume!.mixedWaste
    let sortedWaste = 0

    for (const key in citizen.generatedVolume!.sortedWaste) {
      //console.log(key)
      //console.log(citizen.generatedVolume!.sortedWaste[key])
      sortedWaste += citizen.generatedVolume!.sortedWaste[key]
    }

    const separationPerformance = sortedWaste/mixedWaste * 100
    return Number(separationPerformance.toFixed(0))
  }
}

interface Address {
  streetName?: string
  streetNumber?: string
  city?: string
  postalCode?: string
}

interface GeneratedVolume {
  mixedWaste: number
  sortedWaste: { [key: string]: number }
}
