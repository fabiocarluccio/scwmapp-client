import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
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

  waitingForDisposalsList = true
  loadDisposalsError = false

  constructor(private route: ActivatedRoute,
              private router: Router,
              private citizenService: CitizenService,
              private exceptionManager: ExceptionManagerService,
              private disposalService: DisposalService,
              public smartBinService: SmartBinService) {

  }

  ngOnInit(): void {
    // Check Token JWT - se non è definito, lo redirigo nella pagina di login
    if(localStorage.getItem("currentUser") == null) {
      this.router.navigateByUrl("/")
      return
    }

    this.disposalService.loadDisposals(JSON.parse(localStorage.getItem("citizen")!).id).then(response => {
      console.log(this.disposalService.disposals)
      this.disposals = this.disposalService.disposals
      this.waitingForDisposalsList = false

    }).catch(error => {
      // Mostro errore
      this.loadDisposalsError = true
      //window.alert(this.exceptionManager.getExceptionMessage(error.error.name, "A", error.error.description));
    });
  }

  protected readonly Disposal = Disposal;
}
