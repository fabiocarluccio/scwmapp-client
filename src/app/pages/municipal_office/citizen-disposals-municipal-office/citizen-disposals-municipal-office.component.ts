import {Component, OnInit} from '@angular/core';
import {Disposal} from "../../../models/disposal";
import {ActivatedRoute} from "@angular/router";
import {CitizenService} from "../../../services/citizen.service";
import {ExceptionManagerService} from "../../../services/exception-manager.service";
import {DisposalService} from "../../../services/disposal.service";
import {Citizen} from "../../../models/citizen";

@Component({
  selector: 'app-citizen-disposals-municipal-office',
  templateUrl: './citizen-disposals-municipal-office.component.html',
  styleUrls: ['./citizen-disposals-municipal-office.component.scss']
})
export class CitizenDisposalsMunicipalOfficeComponent implements OnInit {
  citizenId: string | null = null // TODO: credo che conviene salvare in localstorage l'id del cittadino che ha effettuato l'accesso
  // TODO per quanto riguarda la stessa schermata, ma per il municipio, l'id del cittadino sarà passato nella get: ?citizenId=CITTADAINOID
  citizen: Citizen = {} as Citizen
  disposals: Disposal[] = []

  constructor(private route: ActivatedRoute,
              private citizenService: CitizenService,
              private exceptionManager: ExceptionManagerService,
              private disposalService: DisposalService) {}

  ngOnInit(): void {

    this.citizenId = this.route.snapshot.paramMap.get('citizenId');
    console.log(this.citizenId);

    // get citizen data (citizen info + taxes + disposal
    this.citizenService.loadCitizen(this.citizenId!).then(response => {

      console.log(this.citizenService.citizen)
      this.citizen = this.citizenService.citizen

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
}
