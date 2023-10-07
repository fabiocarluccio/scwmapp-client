import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
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


  constructor(private route: ActivatedRoute,
              private citizenService: CitizenService,
              private exceptionManager: ExceptionManagerService,
              private disposalService: DisposalService,
              private taxService: TaxService,
              public smartBinService: SmartBinService) {
    localStorage.setItem('currentRole', "MunicipalOffice")
  }

  ngOnInit(): void {
    this.citizenId = this.route.snapshot.paramMap.get('citizenId');
    //console.log(this.citizenId);

    // get citizen data (citizen info + taxes + disposal
    this.citizenService.loadCitizen(this.citizenId!).then(response => {

      console.log(response)
      this.citizen = response

      this.disposalService.loadLastDisposals(this.citizenId!).then(response => {

        console.log(this.disposalService.disposals)
        this.disposals = this.disposalService.disposals

        this.disposalService.loadWasteMetrics(this.citizenId!).then(response => {
          console.log("wastemetrics:"+response.yearlyVolumes[0])
          this.citizen!.generatedVolume = response.yearlyVolumes[0]

          this.taxService.loadTaxes(this.citizenId!).then(response => {

            console.log(this.taxService.taxes)
            this.taxes = this.taxService.taxes

          }).catch(error => {
            // Mostro errore
            window.alert(this.exceptionManager.getExceptionMessage(error.error.code, "A"));
          });
        }).catch(error => {
          // Mostro errore
          window.alert(this.exceptionManager.getExceptionMessage(error.error.code, "A"));
        });

      }).catch(error => {
        // Mostro errore
        window.alert(this.exceptionManager.getExceptionMessage(error.error.code, "A"));
      });

    }).catch(error => {
      // Mostro errore
      window.alert(this.exceptionManager.getExceptionMessage(error.error.code, "A"));
    });


  }

  protected readonly Citizen = Citizen;
  protected readonly Object = Object;
  protected readonly Number = Number;
  protected readonly Disposal = Disposal;
}
