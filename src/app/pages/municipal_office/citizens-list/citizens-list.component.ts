import { Component } from '@angular/core';

@Component({
  selector: 'app-citizens-list',
  templateUrl: './citizens-list.component.html',
  styleUrls: ['./citizens-list.component.scss']
})
export class CitizensListComponent {
  showCitizenForm = false;

  citizen_name = ""
  citizen_surname = ""
  citizen_fiscalCode = ""
  citizen_email = ""

  citizen_streetName = ""
  citizen_streetNumber = ""
  citizen_postalCode = ""
  citizen_city = ""

  addNewCitizen() {
    console.log("Aggiungo cittadino in db")
  }

  toggleCitizenForm() {
    this.citizen_name = ""
    this.citizen_surname = ""
    this.citizen_email = ""
    this.citizen_fiscalCode = ""
    this.citizen_streetName = ""
    this.citizen_streetNumber = ""
    this.citizen_postalCode = ""
    this.citizen_city = ""
    this.showCitizenForm = !this.showCitizenForm
  }

  importCitizensFile() {
    console.log("caricare csv da inviare al server")
  }
}
