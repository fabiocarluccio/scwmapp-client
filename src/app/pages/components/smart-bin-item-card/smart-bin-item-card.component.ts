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

}
