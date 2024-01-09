import {Component, OnInit, ViewChild} from '@angular/core';
import {WasteType} from "../../../models/wasteType";
import {SmartBinService} from "../../../services/smart-bin.service";
import {ExceptionManagerService} from "../../../services/exception-manager.service";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-waste-types-wmc',
  templateUrl: './waste-types-wmc.component.html',
  styleUrls: ['./waste-types-wmc.component.scss']
})
export class WasteTypesWmcComponent implements OnInit{

  @ViewChild('addNewWasteTypeForm') addNewWasteTypeForm!: NgForm;

  newWasteType: WasteType = {} as WasteType
  wasteTypes: WasteType[] = []

  constructor(private smartBinService: SmartBinService,
              private router: Router,
              private exceptionManager: ExceptionManagerService) {

  }

  ngOnInit(): void {
    // Check Token JWT - se non è definito, lo redirigo nella pagina di login
    if(localStorage.getItem("currentUser") == null) this.router.navigateByUrl("/")

    this.wasteTypes = this.smartBinService.getWasteTypes()
  }

  addNewWasteType() {
    console.log("aggiungo tipologia..." + this.newWasteType.color)

    this.smartBinService.addNewWasteType(this.newWasteType).then(response => {

      window.alert("La tipologia di rifiuti \"" + this.newWasteType.name + "\" è stata registrata corretatmente.");
      this.wasteTypes.push(Object.assign({}, this.newWasteType))
      this.addNewWasteTypeForm.reset()
      //this.newWasteType = {} as WasteType

    }).catch(error => {
      // Mostro errore
      window.alert(this.exceptionManager.getExceptionMessage(error.error.name, "A", error.error.description));
    });

  }


  protected readonly Object = Object;
}
