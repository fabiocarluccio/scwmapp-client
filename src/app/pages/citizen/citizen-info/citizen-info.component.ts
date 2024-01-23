import {Component, OnInit} from '@angular/core';
import {Disposal} from "../../../models/disposal";
import {Tax} from "../../../models/tax";
import {ActivatedRoute, Router} from "@angular/router";
import {CitizenService} from "../../../services/citizen.service";
import {ExceptionManagerService} from "../../../services/exception-manager.service";
import {DisposalService} from "../../../services/disposal.service";
import {TaxService} from "../../../services/tax.service";
import {SmartBinService} from "../../../services/smart-bin.service";
import {Citizen} from "../../../models/citizen";
import {UserService} from "../../../services/user.service";

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

  waitingForCitizenInfo = true
  waitingForTaxesList = true
  waitingForDisposalsList = true
  waitingForSeparationPerformanceData = true
  loadCitizenInfoError = false
  loadTaxesError = false
  loadDisposalsError = false
  loadSeparationPerformanceError = false

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private navigationRoute: Router,
              private citizenService: CitizenService,
              private exceptionManager: ExceptionManagerService,
              private disposalService: DisposalService,
              private taxService: TaxService,
              public smartBinService: SmartBinService) {
  }

  ngOnInit(): void {
    // Check Token JWT - se non è definito, lo redirigo nella pagina di login
    if (localStorage.getItem("currentUser") == null) {
      this.router.navigateByUrl("/")
      return
    }

    //this.citizenId = this.route.snapshot.paramMap.get('citizenId');
    const userId: string = localStorage.getItem("userId")!

    if(userId == null) this.navigationRoute.navigateByUrl('/');

    // get citizen data (citizen Id + citizen token + citizen info + taxes + disposal
    this.citizenService.getCitizenId(userId).then(response => {
      this.citizenId = response.data
      //this.citizenId= "651efee037d6e9236b12133e"
      console.log("CitizenId=" + this.citizenId);

      this.citizenService.loadCitizen(this.citizenId!).then(response => {
        console.log(response)
        this.citizen = response

        this.userService.getCitizenToken(this.citizen!.id!).then(response => {
          this.citizen!.token = response.data
          this.waitingForCitizenInfo = false

        }).catch(error => {
          // Mostro errore
          this.loadCitizenInfoError = true
          //window.alert(this.exceptionManager.getExceptionMessage(error.error.name, "A", error.error.description));
        });

        this.disposalService.loadWasteMetrics(this.citizenId!).then(response => {
          if(response != null && response.yearlyVolumes[response.yearlyVolumes.length - 1].year == new Date().getFullYear())
            this.citizen!.generatedVolume = response.yearlyVolumes[response.yearlyVolumes.length - 1]
          this.waitingForSeparationPerformanceData = false

        }).catch(error => {
          // Mostro errore
          this.loadSeparationPerformanceError = true
          //window.alert(this.exceptionManager.getExceptionMessage(error.error.name, "A", error.error.description));
        });

      }).catch(error => {
        // Mostro errore
        this.loadCitizenInfoError = true
        this.loadSeparationPerformanceError = true
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

    }).catch(error => {
      // Mostro errore
      this.loadCitizenInfoError = true
      this.loadTaxesError = true
      this.loadDisposalsError = true
      this.loadSeparationPerformanceError = true
      //window.alert(this.exceptionManager.getExceptionMessage(error.error.name, "A", error.error.description));
    });

  }

  protected readonly Object = Object;
  protected readonly Number = Number;
  protected readonly Citizen = Citizen;
  protected readonly Disposal = Disposal;

  isExpired(expireDate: string) {
    const date = new Date(expireDate);
    const now = new Date();

    return date < now
  }
}
