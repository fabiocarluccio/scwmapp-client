import {Component, OnInit} from '@angular/core';
import {SmartBinService} from "./services/smart-bin.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'scwmapp';

  constructor(private smartBinService: SmartBinService) {
  }

  ngOnInit(): void {
    // load waste types
    this.smartBinService.loadWasteTypes()
  }

  protected readonly localStorage = localStorage;


}
