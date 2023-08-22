export class Citizen {
  id?: string
  name?: string
  surname?: string
  ssn?: string
  address?: Address
  email?: string

  // non aggiunte da carmine
  token?: string
  taxesStatus?: boolean
  generatedVolume: GeneratedVolume

  constructor() {
    this.generatedVolume = {
      mixedWaste: 0,
      sortedWaste: {}
    }
  }

  static getWasteTypeNames(citizen: Citizen): string[] {
    let wasteTypeNames: string[] = ["Indifferenziata"]

    for(let typeName of Object.keys(citizen.generatedVolume.sortedWaste)) {
      wasteTypeNames.push(typeName)
    }
    return wasteTypeNames
  }

  static getWasteVolumeGenerated(citizen: Citizen): number[] {
    let wasteVolumeGenerated: number[] = [citizen.generatedVolume.mixedWaste]

    for(let typeName of Object.keys(citizen.generatedVolume.sortedWaste)) {
      wasteVolumeGenerated.push(citizen.generatedVolume.sortedWaste[typeName])
    }
    return wasteVolumeGenerated
  }


  static getSeparationPerformance(citizen: Citizen): number {
    let mixedWaste = citizen.generatedVolume?.mixedWaste
    let sortedWaste = 0

    for (const key in citizen.generatedVolume?.sortedWaste) {
      //console.log(key)
      //console.log(citizen.generatedVolume!.sortedWaste[key])
      sortedWaste += citizen.generatedVolume?.sortedWaste[key]
    }

    const separationPerformance = sortedWaste/mixedWaste! * 100
    return Number(separationPerformance.toFixed(0))
  }

  static getPercentageOfTotalWaste(weight: number, citizen: Citizen): number {
    let mixedWaste = citizen.generatedVolume!.mixedWaste
    let sortedWaste = 0

    for (const key in citizen.generatedVolume!.sortedWaste) {
      //console.log(key)
      //console.log(citizen.generatedVolume!.sortedWaste[key])
      sortedWaste += citizen.generatedVolume!.sortedWaste[key]
    }

    const totalWaste = sortedWaste + mixedWaste
    const percentageOfTotal = weight/totalWaste * 100
    return Number(percentageOfTotal.toFixed(1))
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
