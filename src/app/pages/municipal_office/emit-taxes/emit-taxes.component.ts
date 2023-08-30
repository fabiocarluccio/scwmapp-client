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
              private exceptionManager: ExceptionManagerService) {
    localStorage.setItem('currentRole', "MunicipalOffice")
  }

  ngOnInit(): void {
      this.smartBinService.loadWasteTypes().then(response => {
        this.wasteTypes = this.smartBinService.wasteTypes
        //this.wasteTypes = [this.smartBinService.wasteTypes[0]]

        // TODO - fare richiesta get in modo da capire se mostrare il form o meno
        this.showForm = true

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
