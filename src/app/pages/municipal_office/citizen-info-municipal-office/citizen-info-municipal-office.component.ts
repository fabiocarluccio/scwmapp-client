import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Citizen} from "../../../models/citizen";
import {CitizenService} from "../../../services/citizen.service";
import {ExceptionManagerService} from "../../../services/exception-manager.service";
import {DisposalService} from "../../../services/disposal.service";
import {Disposal} from "../../../models/disposal";
import {TaxService} from "../../../services/tax.service";
import {Tax} from "../../../models/tax";
import {SmartBinService} from "../../../services/smart-bin.service";

@Component({
  selector: 'app-citizen-info-municipal-office',
  templateUrl: './citizen-info-municipal-office.component.html',
  styleUrls: ['./citizen-info-municipal-office.component.scss']
})
export class CitizenInfoMunicipalOfficeComponent implements OnInit {

  citizenId: string | null = null
  citizen: Citizen | null = null
  disposals: Disposal[] = []
  taxes: Tax[]= []

  waitingForCitizenInfo = true
  waitingForTaxesList = true
  waitingForDisposalsList = true
  waitingForSeparationPerformanceData = true
  loadCitizenInfoError = false
  loadTaxesError = false
  loadDisposalsError = false
  loadSeparationPerformanceError = false

  constructor(private route: ActivatedRoute,
              private router: Router,
              private citizenService: CitizenService,
              private exceptionManager: ExceptionManagerService,
              private disposalService: DisposalService,
              private taxService: TaxService,
              public smartBinService: SmartBinService) {
  }

  ngOnInit(): void {

    // Check Token JWT - se non è definito, lo redirigo nella pagina di login
    if(localStorage.getItem("currentUser") == null) {
      this.router.navigateByUrl("/")
      return
    }

    this.citizenId = this.route.snapshot.paramMap.get('citizenId');
    //console.log(this.citizenId);

    // get citizen data (citizen info + taxes + disposal
    this.citizenService.loadCitizen(this.citizenId!).then(response => {
      console.log(response)
      this.citizen = response
      this.waitingForCitizenInfo = false

    }).catch(error => {
      // Mostro errore
      this.loadCitizenInfoError = true
      //window.alert(this.exceptionManager.getExceptionMessage(error.error.name, "A", error.error.description));
    });

    this.taxService.loadTaxes(this.citizenId!).then(response => {
      console.log(this.taxService.taxes)
      this.taxes = this.taxService.taxes
      this.waitingForTaxesList = false

    }).catch(error => {
      // Mostro errore
      this.loadTaxesError = true
      //window.alert(this.exceptionManager.getExceptionMessage(error.error.name, "A", error.error.description));
    });

    this.disposalService.loadLastDisposals(this.citizenId!).then(response => {
      console.log(this.disposalService.disposals)
      this.disposals = this.disposalService.disposals
      this.waitingForDisposalsList = false

    }).catch(error => {
      // Mostro errore
      this.loadDisposalsError = true
      //window.alert(this.exceptionManager.getExceptionMessage(error.error.name, "A", error.error.description));
    });

    this.disposalService.loadWasteMetrics(this.citizenId!).then(response => {
      if(response.yearlyVolumes[response.yearlyVolumes.length - 1].year == new Date().getFullYear())
        this.citizen!.generatedVolume = response.yearlyVolumes[response.yearlyVolumes.length - 1]
      this.waitingForSeparationPerformanceData = false

    }).catch(error => {
      // Mostro errore
      this.loadSeparationPerformanceError = true
      //window.alert(this.exceptionManager.getExceptionMessage(error.error.name, "A", error.error.description));
    });


  }

  protected readonly Citizen = Citizen;
  protected readonly Object = Object;
  protected readonly Number = Number;
  protected readonly Disposal = Disposal;
}
