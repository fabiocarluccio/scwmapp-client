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
  selector: 'app-citizen-info',
  templateUrl: './citizen-info.component.html',
  styleUrls: ['./citizen-info.component.scss']
})
export class CitizenInfoComponent implements OnInit {

  citizenId: string | null = null
  citizen: Citizen = new Citizen()
  disposals: Disposal[] = []
  taxes: Tax[]= []


  constructor(private route: ActivatedRoute,
              private citizenService: CitizenService,
              private exceptionManager: ExceptionManagerService,
              private disposalService: DisposalService,
              private taxService: TaxService,
              public smartBinService: SmartBinService) { }

  ngOnInit(): void {
    this.citizenId = this.route.snapshot.paramMap.get('citizenId');
    console.log(this.citizenId);

    // get citizen data (citizen info + taxes + disposal
    this.citizenService.loadCitizen(this.citizenId!).then(response => {

      console.log(this.citizenService.citizen)
      this.citizen = this.citizenService.citizen

      this.disposalService.loadLastDisposals(this.citizenId!).then(response => {

        console.log(this.disposalService.disposals)
        this.disposals = this.disposalService.disposals

        this.taxService.loadTaxes(this.citizenId!).then(response => {

          console.log(this.taxService.taxes)
          this.taxes = this.taxService.taxes

          this.smartBinService.loadWasteTypes().then(response => {

            // nothing to do

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
}
