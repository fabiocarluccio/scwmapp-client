import {Component, OnInit} from '@angular/core';
import {CitizenService} from "../../../services/citizen.service";
import {ExceptionManagerService} from "../../../services/exception-manager.service";
import {Citizen} from "../../../models/citizen";
import {CitizenFilter, CitizenSorting} from "../../../models/citizen-filtering-enum";
import {DisposalService} from "../../../services/disposal.service";
import {TaxService} from "../../../services/tax.service";
import {Router} from "@angular/router";
import {AllocationRequest} from "../../../models/allocationRequest";
import {SmartBinService} from "../../../services/smart-bin.service";
import {WasteType} from "../../../models/wasteType";

@Component({
  selector: 'app-citizens-list',
  templateUrl: './citizens-list.component.html',
  styleUrls: ['./citizens-list.component.scss']
})
export class CitizensListComponent implements OnInit {
  showCitizenForm = false;

  citizens: Citizen [] = [] as Citizen[]
  citizen: Citizen = {} as Citizen

  overallWasteMetrics: any
  fantoccio: Citizen = {} as Citizen

  filters: CitizenFilter[] = [CitizenFilter.noFilter]
  sorting: CitizenSorting = CitizenSorting.alphabetical

  waitingForCitizensList = true
  loadCitizensError = false;
  constructor(public citizenService: CitizenService,
              public disposalService: DisposalService,
              public smartBinService: SmartBinService,
              private taxService: TaxService,
              private router: Router,
              private exceptionManager: ExceptionManagerService) {
  }

  ngOnInit() {
    // Check Token JWT - se non è definito, lo redirigo nella pagina di login
    if(localStorage.getItem("currentUser") == null) {
      this.router.navigateByUrl("/")
      return
    }

    this.citizenService.loadCitizens().then(response => {
      this.citizenService.citizens.forEach(cittadino => {
        cittadino.taxesStatus = true;
        cittadino.generatedVolume = {
          "mixedWaste": 0,
          "sortedWaste": {}
        };
      });

      // Ottengo metriche anno corrente di tutti i cittadini e le assegno ai cittadini)
      this.disposalService.loadWasteMetricsForYear(new Date().getFullYear()).then(response => {
        console.log(response)

        // Eseguo mapping Cittadino-WasteMetrics + eseguo calcolo performances totali
        if (Array.isArray(response)) {

          // Inizializzo il conteggio del peso di tutte le tipologie di rifiuti a 0
          this.fantoccio.generatedVolume = {
            "mixedWaste": 0,
            "sortedWaste": {}
          };
          const wasteTypes = this.smartBinService.getWasteTypes()
          wasteTypes.forEach((type: any) => {
            //console.log(this.smartBinService.getWasteTypes())
            if (type.name != "Mixed waste")
              this.fantoccio.generatedVolume.sortedWaste[type.name] = 0
            ///console.log(type.name+"+"+this.fantoccio.generatedVolume.sortedWaste[type.name])
          })


          response.forEach((item: any) => {
            // Effettuo ricerca cittadino per citizenID
            const foundCitizen = this.citizenService.citizens.find((citizen) => citizen.id === item.citizenID)
            if (!foundCitizen) {
              console.log('Cittadino', item.citizenID,' non trovato.');
            } else {
              foundCitizen.generatedVolume = item.yearlyVolumes[0]

              // Eseguo calcolo performances totali
              this.fantoccio.generatedVolume.mixedWaste += foundCitizen.generatedVolume.mixedWaste
              for (let wasteTypeName in foundCitizen.generatedVolume.sortedWaste) {
                //console.log(wasteTypeName)
                //console.log(foundCitizen.generatedVolume.sortedWaste)
                //console.log(foundCitizen.generatedVolume.sortedWaste[wasteTypeName])
                this.fantoccio.generatedVolume.sortedWaste[wasteTypeName] += foundCitizen.generatedVolume.sortedWaste[wasteTypeName]
              }
            }
          });

        }

        // Ottengo stato tasse di tutti i cittadini
        this.taxService.getCitizensTaxStatus().then(response => {


          // Eseguo mapping Cittadino-stato tasse
          console.log(response)

          if (Array.isArray(response)) {
            response.forEach((item: any) => {
              // Effettuo ricerca cittadino per citizenID
              const foundCitizen = this.citizenService.citizens.find((citizen) => citizen.id === item.citizenID)
              if (!foundCitizen) {
                console.log('Cittadino', item.citizenID,' non trovato.');
              } else {
                foundCitizen.taxesStatus = item.taxStatus
              }
            });
          }


          this.orderByName()

          console.log(this.citizenService.citizens)
          this.waitingForCitizensList = false

        }).catch(error => {
          // Mostro errore
          this.waitingForCitizensList = false
          this.loadCitizensError = true
          //window.alert(this.exceptionManager.getExceptionMessage(error.error.name, "A", error.error.description));
        });

      }).catch(error => {
        // Mostro errore
        this.waitingForCitizensList = false
        this.loadCitizensError = true
        //window.alert(this.exceptionManager.getExceptionMessage(error.error.name, "A", error.error.description));
      });
      // nothing to do
    }).catch(error => {
      // Mostro errore
      this.waitingForCitizensList = false
      this.loadCitizensError = true
      //window.alert(this.exceptionManager.getExceptionMessage(error.error.name, "A", error.error.description));
    });

  }


  // region Citizen Form
  addNewCitizen() {
    console.log("Aggiungo cittadino in db")
    this.citizenService.addCitizen(this.citizen).then(response => {
      console.log(response)
      window.alert("Citizen registered with success.");

      this.citizen.id = (response as any).data
      this.citizenService.citizens.push(this.citizen)
      this.toggleCitizenForm()
      //this.router.navigateByUrl("/municipal_office/citizens-list")
    })
    .catch(error => {
      // Mostro errore
      //old_ window.alert(this.exceptionManager.getExceptionMessage(error.error.code, "A"));
      console.log(error.error)
      window.alert(this.exceptionManager.getExceptionMessage(error.error.name, "A", error.error.description));
    });

  }

  toggleCitizenForm() {
    this.citizen = {} as Citizen
    this.citizen.id = ""
    this.citizen.name = ""
    this.citizen.surname = ""
    this.citizen.ssn = ""
    this.citizen.email = ""
    this.citizen.address = {}
    this.citizen.address.streetName = ""
    this.citizen.address.streetNumber = ""
    this.citizen.address.postalCode = ""
    this.citizen.address.city = ""
    this.citizen.taxesStatus = true;
    this.citizen.generatedVolume = {
      "mixedWaste": 0,
      "sortedWaste": {}
    };

    this.showCitizenForm = !this.showCitizenForm
  }

  importCitizensFile() {
    console.log("caricare csv da inviare al server")
  }

  // endregion

  // region Filtering Logic

  // Sorting
  orderByPerformanceDescendent() {
    this.sorting = CitizenSorting.performanceDescending
    this.filterCitizenList()
  }
  orderByPerformanceAscendent() {
    this.sorting = CitizenSorting.performanceAscending
    this.filterCitizenList()
  }
  orderByName() {
    this.sorting = CitizenSorting.alphabetical
    this.filterCitizenList()
  }

  // Filtering
  filterByNothing() {
    this.filters = [CitizenFilter.noFilter]
    this.filterCitizenList()
  }
  toggleFilterByTaxesPayed() {
    this.filters = this.filters.filter(value => value !== CitizenFilter.noFilter)
    if(this.filters.includes(CitizenFilter.taxesPayed)) {
      // disattivo il filtro
      this.filters = this.filters.filter(value => value !== CitizenFilter.taxesPayed)
      if(this.filters.length == 0) {
        this.filters = [CitizenFilter.noFilter]
      }
    } else {
      // attivo il filtro
      this.filters = this.filters.filter(value => value !== CitizenFilter.noFilter && value !== CitizenFilter.taxesUnpayed)
      this.filters.push(CitizenFilter.taxesPayed)
    }
    this.filterCitizenList()
  }
  toggleFilterByTaxesUnpayed() {
    this.filters = this.filters.filter(value => value !== CitizenFilter.noFilter)
    if(this.filters.includes(CitizenFilter.taxesUnpayed)) {
      // disattivo il filtro
      this.filters = this.filters.filter(value => value !== CitizenFilter.taxesUnpayed)
      if(this.filters.length == 0) {
        this.filters = [CitizenFilter.noFilter]
      }
    } else {
      // attivo il filtro
      this.filters = this.filters.filter(value => value !== CitizenFilter.noFilter && value !== CitizenFilter.taxesPayed)
      this.filters.push(CitizenFilter.taxesUnpayed)
    }
    this.filterCitizenList()
  }
  toggleFilterByLowPerformance() {
    this.filters = this.filters.filter(value => value !== CitizenFilter.noFilter)
    if(this.filters.includes(CitizenFilter.lowPerformance)) {
      // disattivo il filtro
      this.filters = this.filters.filter(value => value !== CitizenFilter.lowPerformance)
      if(this.filters.length == 0) {
        this.filters = [CitizenFilter.noFilter]
      }
    } else {
      // attivo il filtro
      this.filters = this.filters.filter(value => value !== CitizenFilter.noFilter)
      this.filters.push(CitizenFilter.lowPerformance)
    }
    this.filterCitizenList()
  }

  filterCitizenList() {
    function getSeparationPerformance(citizen: Citizen) {
      return 9
    }

    switch (this.sorting) {
      case CitizenSorting.alphabetical:
        this.citizenService.citizens.sort((a, b) => {
          if (a.surname! < b.surname!) return -1;
          if (a.surname! > b.surname!) return 1;

          if (a.name! < b.name!) return -1;
          if (a.name! > b.name!) return 1;

          return 0;
        })
        this.citizens = this.citizenService.citizens
        break
      case CitizenSorting.performanceDescending:
        this.citizenService.citizens.sort((a, b) => Citizen.getSeparationPerformance(b) - Citizen.getSeparationPerformance(a))
        this.citizens = this.citizenService.citizens
        break
      case CitizenSorting.performanceAscending:
        this.citizenService.citizens.sort((a, b) => Citizen.getSeparationPerformance(a) - Citizen.getSeparationPerformance(b))
        this.citizens = this.citizenService.citizens
        break
    }

    console.log(this.filters)
    for (const filter of this.filters) {
      console.log("Filtro:", filter);
      switch (filter) {
        case CitizenFilter.noFilter: break
        case CitizenFilter.taxesPayed:
          this.citizens = this.citizens.filter(citizen => citizen.taxesStatus == true)
          break
        case CitizenFilter.taxesUnpayed:
          this.citizens = this.citizens.filter(citizen => citizen.taxesStatus == false)
          break
        case CitizenFilter.lowPerformance:
          this.citizens = this.citizens.filter(citizen => Citizen.getSeparationPerformance(citizen) < 50)
      }
    }


  }

  //endregion

  protected readonly CitizenSorting = CitizenSorting;
  protected readonly CitizenFilter = CitizenFilter;
  protected readonly Citizen = Citizen;
  protected readonly Object = Object;
}
