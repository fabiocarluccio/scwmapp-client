import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CitizenService} from "../../../services/citizen.service";
import {ExceptionManagerService} from "../../../services/exception-manager.service";
import {DisposalService} from "../../../services/disposal.service";
import {Disposal} from "../../../models/disposal";
import {SmartBinService} from "../../../services/smart-bin.service";

@Component({
  selector: 'app-disposals',
  templateUrl: './disposals.component.html',
  styleUrls: ['./disposals.component.scss']
})
export class DisposalsComponent implements OnInit {

  disposals: Disposal[] | null = null

  constructor(private route: ActivatedRoute,
              private citizenService: CitizenService,
              private exceptionManager: ExceptionManagerService,
              private disposalService: DisposalService,
              public smartBinService: SmartBinService) {

  }

  ngOnInit(): void {
    this.disposalService.loadDisposals(JSON.parse(localStorage.getItem("citizen")!).id).then(response => {

      console.log(this.disposalService.disposals)
      this.disposals = this.disposalService.disposals

    }).catch(error => {
      // Mostro errore
      window.alert(this.exceptionManager.getExceptionMessage(error.error.code, "A"));
    });
  }

  protected readonly Disposal = Disposal;
}
