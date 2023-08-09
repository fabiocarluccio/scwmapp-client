import {Component, Input} from '@angular/core';
import {SmartBin} from "../../../models/smartbin";
import {SmartBinService} from "../../../services/smart-bin.service";

@Component({
  selector: 'app-smart-bin-item-card',
  templateUrl: './smart-bin-item-card.component.html',
  styleUrls: ['./smart-bin-item-card.component.scss']
})
export class SmartBinItemCardComponent {
  @Input() smartBin!: SmartBin

  @Input() isSelected!: boolean

  constructor(public smartBinService: SmartBinService) { }

  getCapacityPercentage(): string {
    const percentage = (this.smartBin.currentCapacity! / this.smartBin.totalCapacity!)*100
    if(percentage >= 100) return "100%"
    return percentage + '%'
  }

  getColorCapacity(): string {
    const capacityPercentage = this.smartBin.currentCapacity! / this.smartBin.totalCapacity!

    switch(true) {
      case capacityPercentage < 0.25: return "green";
      case capacityPercentage < 0.5: return "gold";
      case capacityPercentage < 0.75: return "orange";
      case capacityPercentage < 1 && capacityPercentage != 1: return "tomato";
      default: return "purple"
    }
  }
}
