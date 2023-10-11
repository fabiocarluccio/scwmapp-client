import {Component, OnInit} from '@angular/core';
import {HostConfigService} from "./services/host-config.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'scwmapp';

  constructor(private hostConfigService: HostConfigService) {
    hostConfigService.updateEndpoints()
    console.log("Endpoints aggiornati")
  }

  ngOnInit(): void {
  }

  protected readonly localStorage = localStorage;


}
