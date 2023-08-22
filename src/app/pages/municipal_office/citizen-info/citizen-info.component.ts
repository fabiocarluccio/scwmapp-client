import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Citizen} from "../../../models/citizen";
import {CitizenService} from "../../../services/citizen.service";
import {ExceptionManagerService} from "../../../services/exception-manager.service";

@Component({
  selector: 'app-citizen-info',
  templateUrl: './citizen-info.component.html',
  styleUrls: ['./citizen-info.component.scss']
})
export class CitizenInfoComponent implements OnInit {

  citizenId: string | null = null
  citizen: Citizen = new Citizen()


  constructor(private route: ActivatedRoute,
              private citizenService: CitizenService,
              private exceptionManager: ExceptionManagerService) { }

  ngOnInit(): void {
    this.citizenId = this.route.snapshot.paramMap.get('citizenId');
    console.log(this.citizenId);

    // get citizen data (citizen info + taxes + disposal
    this.citizenService.loadCitizen(this.citizenId!).then(response => {

      console.log(this.citizenService.citizen)
      this.citizen = this.citizenService.citizen
      // nothing to do
    }).catch(error => {
      // Mostro errore
      window.alert(this.exceptionManager.getExceptionMessage(error.error.code, "A"));
    });


  }

  protected readonly Citizen = Citizen;
  protected readonly Object = Object;
  protected readonly Number = Number;
}
