import {Injectable, numberAttribute} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExceptionManagerService {

  exceptions: {[key: string]: { [key: string]: string }} = {
    "Exception": {                            // 0
      "A": "Internal server error."
    },
    "UserNotFoundException": {                // 1
      "A": "User not found.",
      "B": "Internal server error."
    },
    "TokenNotMatchingException": {            // 2
      "A": "Invalid token.",
      "B": "Internal server error."
    },
    "PasswordNotMatchingException": {         // 3
      "A": "Invalid password."
    },
    "UsernameNotFoundException": {            // 4
      "A": "User not found."
    },
    "AuthenticationException": {              // 5 (Accesso al sistema)
      "A": "Access denied."
    },
    "MailException": {                        // 6
      "A": "Error sending email.",
      "B": "Internal server error."
    },
    "CitizenNotFoundException": {             // 7
      "A": "Citizen not found."
    },
    "RequestNotFoundException": {             // 8
      "A": "Allocation request not found."
    },
    "CleaningPathNotFoundException": {        // 9
      "A": "Cleaning path not found."
    },
    "SmartBinStateInvalidException": {        // 10
      "A": "Invalid state."
    },
    "SmartBinTypeNotFoundException": {        // 11
      "A": "Invalid type."
    },
    "SmartBinAlreadyAllocatedException": {    // 12
      "A": "A SmartBin of the same type is already allocated at this location."
    },
    "SmartBinAlreadyRemovedException": {      // 13
      "A": "The selected SmartBin has already been removed."
    },
    "SmartBinNotFoundException": {            // 14
      "A": "SmartBin not found."
    },
    "RequestInvalidStatusException": {        // 15
      "A": "Invalid status."
    },
    "InvalidPositionException": {             // 16
      "A": "The indicated position is outside the allowed area."
    },
    "MethodArgumentNotValidException": {      // 17
      "A": "Internal server error.",
    },
    "RequestAlreadyExistsException": {        // 18
      "A": "The provided request already exists."
    },
    "RequestAlreadyConfirmedException": {     // 19
      "A": "This request has already been confirmed and cannot be modified."
    },
    "InvalidScheduledDateException": {        // 20
      "A": "Enter a valid scheduling date (from the next day onwards)."
    },
    "FileNotValidException": {                // 21
      "A": "The provided file is not in a valid CSV format."
    },
    "DuplicateKeyException": {                // 22
      "A": "A citizen with the same Fiscal Code is already registered."
    },
    "WebClientResponseException": {           // 23
      "A": "Internal server error."
    },
    "WebClientRequestException": {            // 24
      "A": "Internal server error."
    },
    "AnnualTaxAlreadyEmittedException": {     // 25
      "A": "Taxes for the current year have already been issued."
    },
    "TaxRateNotFoundException": {             // 26
      "A": "Provide the list of fees for refusal."
    },
    "TaxNotFoundException": {                 // 27
      "A": "The tax with the provided identifier does not exist."
    },
    "TaxAlreadyPaidException": {              // 28
      "A": "Payment for this tax has already occurred."
    },
    "StripeException": {                      // 29
      "A": "Error during payment. If the problem persists, contact support."
    },
    "ConstraintViolationException": {         // 30
      "A": "Unable to complete the operation. Please enter valid values."
    },
  };


  constructor() {

  }

  getExceptionMessage(exceptionName: string, variant: string, backendDescription: string) {
    // Controllo che il dizionario exceptions abbia una key di nome exceptionName.
    // Se non la tiene (se non è stata mappata), restituisci "Errore interno del server."
    if(!(exceptionName in this.exceptions)) {
      return this.exceptions["Exception"]["A"]  // Return "Internal server error." If exceptionName is unmapped.
    }

    switch (exceptionName) {
      // Eccezioni per le quali è necessaria la stampa del campo 'description' in arrivo dal backend
      case "MethodArgumentNotValidException": // (17)
      case "WebClientResponseException":      // (23)
      case "WebClientRequestException":       // (24)
      case "ConstraintViolationException":    // (30)
        return backendDescription
      default: return this.exceptions[exceptionName][variant]
    }

  }

}
/*export class ExceptionManagerService {

  exceptions:{[key: number]: { [key: string]: string } } = {
    0: {
      "A": "Errore interno del server."
    },
    1: {
      "A": "Utente inesistente.",
      "B": "Errore interno del server."
    },
    2: {
      "A": "Token non valido."
    },
    3: {
      "A": "Password non valida."
    },
    4: {
      "A": "Utente inesistente."
    },
    5: {
      "A": "Accesso negato." // Accesso al sistema (login)
    },
    6: {
      "A": "Accesso non consentito." // Accesso ad una risorsa
    }
  };

  constructor() {

  }

  getExceptionMessage(code: number, variant: string) {
    return this.exceptions[code][variant];
  }

}


exceptions:{[key: string]: { [key: string]: string } } = {
    "Exception": {                          // 0
      "A": "Errore interno del server."
    },
    "UserNotFoundException": {              // 1
      "A": "Utente inesistente.",
      "B": "Errore interno del server."
    },
    "TokenNotMatchingException": {          // 2
      "A": "Token non valido.",
      "B": "Errore interno del server."
    },
    "PasswordNotMatchingException": {       // 3
      "A": "Password non valida."
    },
    "UsernameNotFoundException": {          // 4
      "A": "Utente inesistente."
    },
    "AuthenticationException": {            // 5
      "A": "Accesso negato."                // Accesso al sistema (login)
    },
    "MailException": {                      // 6
      "A": "Errore durante l'invio della mail.",
      "B": "Errore interno del server."
    },
    "CitizenNotFoundException": {           // 7
      "A": "Cittadino inesistente."
    },
    "RequestNotFoundException": {           // 8
      "A": "Richiesta di allocazione inesistente."
    },
    "CleaningPathNotFoundException": {      // 9
      "A": "Percorso di pulizia inesistente."
    },
    "SmartBinStateInvalidException": {      // 10
      "A": "Stato non valido."
    },
    "SmartBinTypeNotFoundException": {      // 11
      "A": "Tipologia non valida."
    },
    "SmartBinAlreadyAllocatedException": {  // 12
      "A": "Uno SmartBin dello stesso tipo è già stato allocato in questa posizione."
    },
    "SmartBinAlreadyRemovedException": {    // 13
      "A": "Lo SmartBin selezionato è già stato rimosso."
    },
    "SmartBinNotFoundException": {          // 14
      "A": "SmartBin inesistente."
    },
    "RequestInvalidStatusException": {      // 15
      "A": "Stato non valido."
    },
    "InvalidPositionException": {           // 16
      "A": "La posizione indicata risulta essere al di fuori della zona consentita."
    },
    "MethodArgumentNotValidException": {    // 17
      "A": "Errore interno del server.",
      "B": "Per piacere, selezionare una località "// TODO OOOOOO
    },
    "RequestAlreadyExistsException": {      // 18
      "A": "La richiesta fornita è già presente."
    },
    "RequestAlreadyConfirmedException": {   // 19
      "A": "La presente richiesta è già stata confermata e non puó essere modificata."
    },
    "InvalidScheduledDateException": {      // 20
      "A": "Inserire una data di programmazione valida (Dal giorno seguente in poi)."
    },
    "FileNotValidException": {              // 21
      "A": "Il file fornito non risulta essere in un formato CSV valido."
    },
    "DuplicateKeyException": {              // 22
      "A": "Un cittadino con lo stesso Codice Fiscale risulta già registrato."
    },
    "WebClientResponseException": {         // 23
      "A": "Errore interno del server."
    },
    "WebClientRequestException": {          // 24
      "A": "Errore interno del server."
    },
    "AnnualTaxAlreadyEmittedException": {   // 25
      "A": "Le tasse per l'anno corrente sono già state emesse."
    },
    "TaxRateNotFoundException": {           // 26
      "A": "Fornire la lista delle commissioni per rifiuto."
    },
    "TaxNotFoundException": {               // 27
      "A": "La tassa con l'identificativo fornito è inesistente."
    },
    "TaxAlreadyPaidException": {            // 28
      "A": "Il pagamento della presente tassa risulta già avvenuto."
    },
    "StripeException": {                    // 29
      "A": "Errore durante il pagamento. Se il problema persiste, contattare l'assistenza."
    },
    "ConstraintViolationException": {       // 30
      "A": "Impossibile completare l'operazione. Per favore, inserire valori validi."
    },


  };

*/
