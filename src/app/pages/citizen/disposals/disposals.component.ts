import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CitizenService} from "../../../services/citizen.service";
import {ExceptionManagerService} from "../../../services/exception-manager.service";
import {DisposalService} from "../../../services/disposal.service";
import {Disposal} from "../../../models/disposal";

@Component({
  selector: 'app-disposals',
  templateUrl: './disposals.component.html',
  styleUrls: ['./disposals.component.scss']
})
export class DisposalsComponent implements OnInit {

  citizenId: string = "dio" // TODO: credo che conviene salvare in localstorage l'id del cittadino che ha effettuato l'accesso
  // TODO per quanto riguarda la stessa schermata, ma per il municipio, l'id del cittadino sarà passato nella get: ?citizenId=CITTADAINOID
  disposals: Disposal[] = []

  constructor(private route: ActivatedRoute,
              private citizenService: CitizenService,
              private exceptionManager: ExceptionManagerService,
              private disposalService: DisposalService) {

    this.disposalService.loadDisposals(this.citizenId!).then(response => {

      console.log(this.disposalService.disposals)
      this.disposals = this.disposalService.disposals

    }).catch(error => {
      // Mostro errore
      window.alert(this.exceptionManager.getExceptionMessage(error.error.code, "A"));
    });

  }

  ngOnInit(): void {

  }
}
