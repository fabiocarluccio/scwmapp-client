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

  disposals: Disposal[] = []

  constructor(private route: ActivatedRoute,
              private citizenService: CitizenService,
              private exceptionManager: ExceptionManagerService,
              private disposalService: DisposalService) {
    localStorage.setItem('currentRole', "Citizen")

    this.disposalService.loadDisposals(this.citizenService.citizen.id!).then(response => {

      console.log(this.disposalService.disposals)
      this.disposals = this.disposalService.disposals

    }).catch(error => {
      // Mostro errore
      window.alert(this.exceptionManager.getExceptionMessage(error.error.code, "A"));
    });

  }

  ngOnInit(): void {

  }

  protected readonly Disposal = Disposal;
}
