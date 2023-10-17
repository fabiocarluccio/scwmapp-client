import {Component, Input, OnInit} from '@angular/core';
import {CleaningPath} from "../../../models/cleaning-path";
import {SmartBinService} from "../../../services/smart-bin.service";
import {ExceptionManagerService} from "../../../services/exception-manager.service";

@Component({
  selector: 'app-cleaning-path-item-card',
  templateUrl: './cleaning-path-item-card.component.html',
  styleUrls: ['./cleaning-path-item-card.component.scss']
})
export class CleaningPathItemCardComponent implements OnInit {
  @Input() cleaningPath!: CleaningPath
  @Input() isCollapsed!: boolean


  constructor() {
  }
  ngOnInit(): void {
  }

  toggleCollapseView() {
    this.isCollapsed = !this.isCollapsed
  }


  getFormattedDate(): string {
    const timestamp = new Date(this.cleaningPath.scheduledDate)
    const day = String(timestamp.getDate()).padStart(2, '0');
    const month = String(timestamp.getMonth() + 1).padStart(2, '0');
    const year = timestamp.getFullYear();
    const hours = String(timestamp.getHours()).padStart(2, '0');
    const minutes = String(timestamp.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;

  }

  getNumberOfBins() {
    return this.cleaningPath.smartBinIDPath.length
  }

}
