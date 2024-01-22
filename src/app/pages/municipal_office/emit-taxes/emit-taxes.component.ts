import {Component, OnInit} from '@angular/core';
import {TaxService} from "../../../services/tax.service";
import {WasteType} from "../../../models/wasteType";
import {SmartBinService} from "../../../services/smart-bin.service";
import {ExceptionManagerService} from "../../../services/exception-manager.service";
import {AllocationRequest} from "../../../models/allocationRequest";
import {Router} from "@angular/router";

@Component({
  selector: 'app-emit-taxes',
  templateUrl: './emit-taxes.component.html',
  styleUrls: ['./emit-taxes.component.scss']
})
export class EmitTaxesComponent implements OnInit {

  wasteTypes: WasteType[] = []
  feeAmounts: number[] = []
  baseFee: number | null = null

  showForm: boolean = false

  previousYear = new Date().getFullYear() - 1;
  paymentButtonMessage = ""
  isEmittingTaxes = false

  waitingForTaxStatus = true
  loadTaxStatusError = false


  constructor(private smartBinService: SmartBinService,
              private taxService: TaxService,
              private router:Router,
              private exceptionManager: ExceptionManagerService) {
    this.paymentButtonMessage = "Emit taxes for the year " + this.previousYear

  }

  ngOnInit(): void {

    // Check Token JWT - se non è definito, lo redirigo nella pagina di login
    if(localStorage.getItem("currentUser") == null) {
      this.router.navigateByUrl("/")
      return
    }

    this.wasteTypes = this.smartBinService.getWasteTypes()
    this.taxService.getTaxStatus().then(response => {
      this.showForm = !response.data;
      //this.showForm = true // TODO - se bisogna fare una prova per testare il form tasse, abilitare questa riga
      this.waitingForTaxStatus = false
    }).catch(error => {
      // Mostro errore
      this.loadTaxStatusError = true
      //window.alert(this.exceptionManager.getExceptionMessage(error.error.name, "A", error.error.description));
      //this.route.navigateByUrl('/municipal_office/smartbin-allocation');
    });
  }



  onSubmit(emitTaxesForm: any) {
    this.isEmittingTaxes = true
    this.paymentButtonMessage = "Emissione tasse..."

    console.log(this.wasteTypes)
    console.log(this.feeAmounts)

    const payload: Record<string, number> = {
      FixedFee: this.baseFee!,
      Indifferenziata: this.feeAmounts[0]
    };

    for (let i = 1; i < this.wasteTypes.length; i++) {
      payload[this.wasteTypes[i].name] = this.feeAmounts[i]
    }

    console.log(payload);

    this.taxService.emitTaxes(payload).then(response => {
      console.log(response)
      this.isEmittingTaxes = false
      this.paymentButtonMessage = "Emetti tasse per l'anno " + this.previousYear
      this.showForm = false
    })
    .catch(error => {
      this.isEmittingTaxes = false
      this.paymentButtonMessage = "Emetti tasse per l'anno " + this.previousYear
      // Mostro errore
      window.alert(this.exceptionManager.getExceptionMessage(error.error.name, "A", error.error.description));
    });
  }


  protected readonly Date = Date;
}
