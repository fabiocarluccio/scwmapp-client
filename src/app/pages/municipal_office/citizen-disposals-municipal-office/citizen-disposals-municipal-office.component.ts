import {Component, OnInit} from '@angular/core';
import {Disposal} from "../../../models/disposal";
import {ActivatedRoute, Router} from "@angular/router";
import {CitizenService} from "../../../services/citizen.service";
import {ExceptionManagerService} from "../../../services/exception-manager.service";
import {DisposalService} from "../../../services/disposal.service";
import {Citizen} from "../../../models/citizen";
import {SmartBinService} from "../../../services/smart-bin.service";

@Component({
  selector: 'app-citizen-disposals-municipal-office',
  templateUrl: './citizen-disposals-municipal-office.component.html',
  styleUrls: ['./citizen-disposals-municipal-office.component.scss']
})
export class CitizenDisposalsMunicipalOfficeComponent implements OnInit {
  citizenId: string | null = null
  citizen: Citizen = {} as Citizen
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
    if(localStorage.getItem("currentUser") == null) this.router.navigateByUrl("/")

    this.citizenId = this.route.snapshot.paramMap.get('citizenId');
    console.log(this.citizenId);

    // get citizen data (citizen info + taxes + disposal
    this.citizenService.loadCitizen(this.citizenId!).then(response => {
      console.log(response)
      this.citizen = response

      this.disposalService.loadDisposals(this.citizenId!).then(response => {
        console.log(this.disposalService.disposals)
        this.disposals = this.disposalService.disposals
        this.waitingForDisposalsList = false

      }).catch(error => {
        // Mostro errore
        this.loadDisposalsError = true
        //window.alert(this.exceptionManager.getExceptionMessage(error.error.name, "A", error.error.description));
      });

    }).catch(error => {
      // Mostro errore
      this.loadDisposalsError = true
      //window.alert(this.exceptionManager.getExceptionMessage(error.error.name, "A", error.error.description));
    });
  }

  protected readonly Disposal = Disposal;
}
