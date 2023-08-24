import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SmartBin} from "../../../models/smartbin";
import {SmartBinService} from "../../../services/smart-bin.service";

@Component({
  selector: 'app-smart-bin-item-card',
  templateUrl: './smart-bin-item-card.component.html',
  styleUrls: ['./smart-bin-item-card.component.scss']
})
export class SmartBinItemCardComponent {
  @Input() smartBin!: SmartBin

  @Input() isInSelectionMode = false
  @Input() isSelected = false

  @Input() selectionOrder?: number

  @Output() selectionEvent = new EventEmitter<any>();


  constructor(public smartBinService: SmartBinService) { }

  getCapacityPercentage(): string {
    const percentage = (this.smartBin.currentCapacity! / this.smartBin.totalCapacity!)*100
    if(percentage >= 100) return "100%"
    return percentage + '%'
  }

  getColorCapacity(): string {
    const capacityPercentage = this.smartBin.currentCapacity! / this.smartBin.totalCapacity!

    switch(true) {
      case capacityPercentage < 0.25: return "#78BC81";
      case capacityPercentage < 0.5: return "#FFBE60";
      case capacityPercentage < 0.75: return "#FF8961";
      case capacityPercentage < 1 && capacityPercentage != 1: return "#FF6961";
      default: return "purple"
    }
  }

  cardSelected() {
    if(this.isInSelectionMode) {
      this.isSelected = !this.isSelected
      this.selectionEvent.emit(this.smartBin)
    }
  }

  getBannerStyle(): string {
    if(this.isSelected) return "number-banner-selected"
    return ""
  }

  getSelectionOrder(): string {
    if (this.selectionOrder != undefined && this.selectionOrder != -1) return this.selectionOrder+1+""
    else return ""
  }

  getCardStyle() {
    let style = ""
    if(this.isInSelectionMode) style += " bin-item-card-selection-mode "
    if(this.isSelected) style += " bin-item-card-selected "
    return style
  }
}
