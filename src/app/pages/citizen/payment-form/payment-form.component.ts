import {Component, OnInit} from '@angular/core';
import {TaxService} from "../../../services/tax.service";
import {ExceptionManagerService} from "../../../services/exception-manager.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Tax} from "../../../models/tax";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, tap} from "rxjs";
import {PaymentData} from "../../../models/payment-request";

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
  cvc: string = "";

  isDoingPayment = false
  paymentButtonMessage = "Paga Tassa"


  constructor(private router: Router,
              private route: ActivatedRoute,
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
    this.isDoingPayment = true;
    this.paymentButtonMessage = "Elaborazione Pagamento...";

    // Generazione Token Stripe
    (<any>window).Stripe.card.createToken({
      number: this.cardNumber,
      exp_month: this.expireDate.split('/')[0],
      exp_year: this.expireDate.split('/')[1],
      cvc: this.cvc
    }, (status: number, response: any) => {
      if (status === 200) {
        const token = response.id;
        const email = JSON.parse(localStorage.getItem("citizen")!).email
        const paymentData: PaymentData = {email: email, fullName: this.accountHolder, amount: this.tax!.amount, cardToken: token}

        // Aggiorno Backend
        this.taxService.payTax(this.tax!.id, paymentData).then(response => {
          console.log(response)

          window.alert("✅ Pagamento Effettuato!");
          this.router.navigateByUrl('citizen')
        })
        .catch(error => {
          // Mostro errore
          window.alert(this.exceptionManager.getExceptionMessage(error.error.code, "A"));
          this.isDoingPayment = false;
          this.paymentButtonMessage = "Paga Tassa";
        });

      } else {
        console.log(response.error.message);
      }
    });

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
