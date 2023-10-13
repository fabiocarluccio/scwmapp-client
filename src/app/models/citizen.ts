import {WasteType} from "./wasteType";

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

  static showSeparationPerformance(citizen: Citizen): boolean {
    if(citizen.generatedVolume == null) return false
    let showSeparationPerformance = false
    Citizen.getWasteVolumeGenerated(citizen).forEach(wasteVolume => {
      if (wasteVolume > 0) {
        showSeparationPerformance = true
      }
    });
    return showSeparationPerformance
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
    //console.log(citizen.generatedVolume)
    for(let typeName of Object.keys(citizen.generatedVolume.sortedWaste)) {
      wasteVolumeGenerated.push(citizen.generatedVolume.sortedWaste[typeName])
    }
    return wasteVolumeGenerated
  }


  static getSeparationPerformance(citizen: Citizen): number {
    return 100 - Citizen.getPercentageOfTotalWaste(citizen.generatedVolume.mixedWaste, citizen)

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
    console.log("weight: "+ weight + "; totalWaste: "+ totalWaste)
    const percentageOfTotal = weight/totalWaste * 100
    return Number(percentageOfTotal.toFixed(1))
  }

  static getPercentageOverSortedWaste(weight: number, citizen: Citizen): number {
    let sortedWaste = 0

    for (const key in citizen.generatedVolume!.sortedWaste) {
      //console.log(key)
      //console.log(citizen.generatedVolume!.sortedWaste[key])
      sortedWaste += citizen.generatedVolume!.sortedWaste[key]
    }

    const percentageOnMixedWaste = weight/sortedWaste * 100
    return Number(percentageOnMixedWaste.toFixed(1))
  }

  static getWasteTypeColors(wasteTypeNames: string[], wasteTypes: WasteType[]): string[] {

    let wasteTypeColors: string[] = []

    for(const wasteTypeName of wasteTypeNames) {
      const typeColor = wasteTypes.filter(type => type.name === wasteTypeName)
      if (typeColor.length == 1) {
        wasteTypeColors.push(typeColor[0].color)
      }
    }

    return wasteTypeColors;
  }

  static getSeparationPerformanceColor(separationPerformancePercentage: number): string {

    if(isNaN(separationPerformancePercentage)) {
      return "#444444"
    }
    if(separationPerformancePercentage > 80) {
      return "#18AC91"
    }
    if(separationPerformancePercentage > 60) {
      return "#78BC81"
    }
    if(separationPerformancePercentage > 40) {
      return "#FFBE60"
    }
    if(separationPerformancePercentage > 20) {
      return "#FF8961"
    }
    return "#FF6961"
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


