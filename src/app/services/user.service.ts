import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, firstValueFrom, tap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl:string = "http://localhost:8080/api/authentication/";
  user:User = {} as User;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':''
    })
  }

  constructor(private http:HttpClient) {
    // TODO il token va preso mediante chiamata API diretta (authentication)
    localStorage.setItem('currentUser', JSON.stringify({token:'sduinyqwec789d23ycueqwibhceqdijuy'}))

    /*this.user = {
        id: "1",
        username: "Roberto",
        email: "roberto.vergallo@unisalento.it",
        password: "123",
        role: "ADMIN"
    };*/
  }

  sendPasswordResetToken(user: User): Promise<any> {
    // Effettua la richiesta POST e restituisci la promessa
    return firstValueFrom(this.http.post(this.baseUrl + 'password_reset_token', user, this.httpOptions).pipe(
      tap(response => {
        console.log('Richiesta POST riuscita:', response);
        // Gestisci la risposta dal server qui, se necessario
      }),
      catchError(error => {
        console.error('Errore durante la richiesta POST:', error);
        // Gestisci l'errore qui, se necessario
        throw error; // Rilancia l'errore come promessa respinta
      })
    )); // firstValueFrom() è meglio rispetto a toPromise (deprecato). https://stackoverflow.com/questions/67044273/rxjs-topromise-deprecated
  }

  updatePasswordByToken(user: User) {
    return firstValueFrom(this.http.post(this.baseUrl + 'password_reset', user, this.httpOptions).pipe(
      tap(response => {
        console.log('Richiesta POST riuscita:', response);
        // Gestisci la risposta dal server qui, se necessario
      }),
      catchError(error => {
        console.error('Errore durante la richiesta POST:', error);
        // Gestisci l'errore qui, se necessario
        throw error; // Rilancia l'errore come promessa respinta
      })
    ));
  }

  authenticate(user: User) {
    return firstValueFrom(this.http.post<MyResponse>(this.baseUrl + 'authenticate', user, this.httpOptions).pipe(
      tap(response => {
        console.log('Richiesta POST riuscita:', response);
        // Gestisci la risposta dal server qui, se necessario
        console.log(response.jwt)
      }),
      catchError(error => {
        console.error('Errore durante la richiesta POST:', error);
        // Gestisci l'errore qui, se necessario
        throw error; // Rilancia l'errore come promessa respinta
      })
    ));
  }
}

interface MyResponse {
  jwt: string
}
