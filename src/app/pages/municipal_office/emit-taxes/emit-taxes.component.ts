import {Component, OnInit} from '@angular/core';
import {TaxService} from "../../../services/tax.service";
import {WasteType} from "../../../models/wasteType";
import {SmartBinService} from "../../../services/smart-bin.service";
import {ExceptionManagerService} from "../../../services/exception-manager.service";

@Component({
  selector: 'app-emit-taxes',
  templateUrl: './emit-taxes.component.html',
  styleUrls: ['./emit-taxes.component.scss']
})
export class EmitTaxesComponent implements OnInit {

  wasteTypes: WasteType[] = []
  feeAmounts: number[] = []

  showForm: boolean = false




  constructor(private smartBinService: SmartBinService,
              private taxService: TaxService,
              private exceptionManager: ExceptionManagerService) {
  }

  ngOnInit(): void {
    this.wasteTypes = this.smartBinService.getWasteTypes()
    this.taxService.getTaxStatus().then(response => {
      this.showForm = response == "To emit";

    }).catch(error => {
      // Mostro errore
      window.alert(this.exceptionManager.getExceptionMessage(error.error.code, "A"));
    });
  }

  onSubmit(emitTaxesForm: any) {
    console.log(this.wasteTypes)
    console.log(this.feeAmounts)
  }


}
