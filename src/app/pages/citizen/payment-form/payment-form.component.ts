import {Component, OnInit} from '@angular/core';
import {TaxService} from "../../../services/tax.service";
import {ExceptionManagerService} from "../../../services/exception-manager.service";
import {ActivatedRoute} from "@angular/router";
import {Tax} from "../../../models/tax";

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit{

  taxId: string | null = null

  tax: Tax | null = null

  accountHolder: string = ""
  cardNumber: string = ""
  expireDate: string = ""
  cvv: string = "";


  constructor(private route: ActivatedRoute,
              private taxService: TaxService,
              private exceptionManager: ExceptionManagerService) {
  }

  ngOnInit(): void {
    this.taxId = this.route.snapshot.paramMap.get('taxId');

    this.taxService.getTax(this.taxId!).then(response => {

      console.log(response)
      this.tax = response

    }).catch(error => {
      // Mostro errore
      window.alert(this.exceptionManager.getExceptionMessage(error.error.code, "A"));
    });

  }

  onSubmit(emitTaxesForm: any) {
    console.log("inviare dati a stripe")
  }

  handleSpaces($event: Event | undefined) {

    if (event) {
      // Ottieni il valore corrente dell'input
      let inputValue = (event.target as HTMLInputElement).value;

      // Rimuovi gli spazi esistenti
      inputValue = inputValue.replace(/\s/g, '');

      // Aggiungi uno spazio ogni 4 caratteri, tranne dopo l'ultimo gruppo
      const spacedValue = inputValue.replace(/(.{4})(?!$)/g, '$1 ');

      // Assegna il valore modificato all'input
      this.cardNumber = spacedValue;
    }
  }
}
