import {Component, OnInit} from '@angular/core';
import {Disposal} from "../../../models/disposal";
import {Tax} from "../../../models/tax";
import {ActivatedRoute} from "@angular/router";
import {CitizenService} from "../../../services/citizen.service";
import {ExceptionManagerService} from "../../../services/exception-manager.service";
import {DisposalService} from "../../../services/disposal.service";
import {TaxService} from "../../../services/tax.service";
import {SmartBinService} from "../../../services/smart-bin.service";
import {Citizen} from "../../../models/citizen";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user";

@Component({
  selector: 'app-citizen-info',
  templateUrl: './citizen-info.component.html',
  styleUrls: ['./citizen-info.component.scss']
})
export class CitizenInfoComponent implements OnInit {
  citizenId: string | null = null
  citizen: Citizen | null = null
  disposals: Disposal[] = []
  taxes: Tax[]= []


  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private citizenService: CitizenService,
              private exceptionManager: ExceptionManagerService,
              private disposalService: DisposalService,
              private taxService: TaxService,
              public smartBinService: SmartBinService) {
    localStorage.setItem('currentRole', "Citizen")
  }

  ngOnInit(): void {
    //this.citizenId = this.route.snapshot.paramMap.get('citizenId');
    const userId: string = localStorage.getItem("userId")!

    // get citizen data (citizen Id + citizen token + citizen info + taxes + disposal
    this.citizenService.getCitizenId(userId).then(response => {
      this.citizenId = response.data
      //this.citizenId= "651efee037d6e9236b12133e"
      console.log("CitizenId=" + this.citizenId);

      this.citizenService.loadCitizen(this.citizenId!).then(response => {

        console.log(this.citizenService.citizen)
        this.citizen = this.citizenService.citizen

        this.userService.getCitizenToken(this.citizen!.id!).then(response => {

          this.citizen!.token = response.data

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


      }).catch(error => {
        // Mostro errore
        window.alert(this.exceptionManager.getExceptionMessage(error.error.code, "A"));
      });
    }).catch(error => {
      // Mostro errore
      window.alert(this.exceptionManager.getExceptionMessage(error.error.code, "A"));
    });

  }

  protected readonly Object = Object;
  protected readonly Number = Number;
  protected readonly Citizen = Citizen;
  protected readonly Disposal = Disposal;
}
