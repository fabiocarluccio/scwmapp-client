import { Component } from '@angular/core';

@Component({
  selector: 'app-emit-taxes',
  templateUrl: './emit-taxes.component.html',
  styleUrls: ['./emit-taxes.component.scss']
})
export class EmitTaxesComponent {

  indifferenziata: string = ""
  glass: string = ""
  plastic: string = ""

  onSubmit(emitTaxesForm: any) {

  }
}
