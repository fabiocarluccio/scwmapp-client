import {Component, Input, OnInit} from '@angular/core';
import {CleaningPath} from "../../../models/cleaning-path";
import {SmartBinService} from "../../../services/smart-bin.service";
import {ExceptionManagerService} from "../../../services/exception-manager.service";
import {SmartBin} from "../../../models/smartbin";

@Component({
  selector: 'app-cleaning-path-item-card',
  templateUrl: './cleaning-path-item-card.component.html',
  styleUrls: ['./cleaning-path-item-card.component.scss']
})
export class CleaningPathItemCardComponent implements OnInit {
  @Input() cleaningPath!: CleaningPath
  @Input() isCollapsed!: boolean

  smartBinList: SmartBin[] = []


  constructor() {
    const smartBin: SmartBin = {}
    smartBin.id = "diocpo"
    smartBin.type = "Mixed waste"
    smartBin.name = "SmartBin nome"
    smartBin.currentCapacity = 1.3
    smartBin.totalCapacity = 5



    this.smartBinList.push(smartBin)
  }
  ngOnInit(): void {
  }

  toggleCollapseView() {
    this.isCollapsed = !this.isCollapsed
  }

  getFormattedDateTime(): string {
    const timestamp = new Date(this.cleaningPath.scheduledDate)
    const day = String(timestamp.getDate()).padStart(2, '0');
    const month = String(timestamp.getMonth() + 1).padStart(2, '0');
    const year = timestamp.getFullYear();
    const hours = String(timestamp.getHours()).padStart(2, '0');
    const minutes = String(timestamp.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;

  }

  getFormattedDate(): string {
    const opzioniData: Intl.DateTimeFormatOptions = { /*year: 'numeric', */month: 'long', day: 'numeric' };
    const dataConvertita = new Date(this.cleaningPath.scheduledDate);
    return dataConvertita.toLocaleDateString('it-IT', opzioniData).replace(/\b\w/g, (match) => match.toUpperCase());;
  }
  getFormattedTime(): string {
    const timestamp = new Date(this.cleaningPath.scheduledDate)
    const hours = String(timestamp.getHours()).padStart(2, '0');
    const minutes = String(timestamp.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }


  getNumberOfBins() {
    return this.cleaningPath.smartBinIDPath.length
  }

}
