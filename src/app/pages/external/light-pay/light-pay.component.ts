import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-light-pay',
  templateUrl: './light-pay.component.html',
  styleUrls: ['./light-pay.component.scss']
})
export class LightPayComponent {
  taxId: string | null = null

  constructor(private route: Router) {

  }

  finalizePayment() {

    console.log("effettuo il pagamento della tassa " + this.taxId)
    this.route.navigateByUrl('/citizen');
  }
}
