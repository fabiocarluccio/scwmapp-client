import {Injectable, numberAttribute} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExceptionManagerService {

  exceptions:{[key: number]: { [key: string]: string } } = {
    0: {
      "A": "Errore interno del server"
    },
    1: {
      "A": "Utente inesistente",
      "B": "Errore interno del server"
    },
    2: {
      "A": "Token non valido"
    },
    3: {
      "A": "Password non valida"
    },
    4: {
      "A": "Utente inesistente"
    },
    5: {
      "A": "Accesso negato"
    }
  };

  constructor() {

  }

  getExceptionMessage(code: number, variant: string) {
    return this.exceptions[code][variant];
  }

}
