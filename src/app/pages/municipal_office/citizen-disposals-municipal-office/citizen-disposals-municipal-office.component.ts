import {Component, OnInit} from '@angular/core';
import {Disposal} from "../../../models/disposal";
import {ActivatedRoute} from "@angular/router";
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

  constructor(private route: ActivatedRoute,
              private citizenService: CitizenService,
              private exceptionManager: ExceptionManagerService,
              private disposalService: DisposalService,
              public smartBinService: SmartBinService) {
    localStorage.setItem('currentRole', "MunicipalOffice")
  }

  ngOnInit(): void {

    this.citizenId = this.route.snapshot.paramMap.get('citizenId');
    console.log(this.citizenId);

    // get citizen data (citizen info + taxes + disposal
    this.citizenService.loadCitizen(this.citizenId!).then(response => {

      console.log(response)
      this.citizen = response

      this.disposalService.loadDisposals(this.citizenId!).then(response => {

        console.log(this.disposalService.disposals)
        this.disposals = this.disposalService.disposals

      }).catch(error => {
        // Mostro errore
        window.alert(this.exceptionManager.getExceptionMessage(error.error.code, "A"));
      });

    }).catch(error => {
      // Mostro errore
      window.alert(this.exceptionManager.getExceptionMessage(error.error.code, "A"));
    });
  }

  protected readonly Disposal = Disposal;
}
