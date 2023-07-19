import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";

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

  sendPasswordResetToken(user: User) {
    // Effettua la richiesta POST
    this.http.post(this.baseUrl + 'password_reset_token', user, this.httpOptions)
      .subscribe(
        response => {
          console.log('Richiesta POST riuscita:', response);
          // Gestisci la risposta dal server qui
        },
        error => {
          console.error('Errore durante la richiesta POST:', error);
          // Gestisci l'errore qui
        }
      );
  }

  updatePasswordByToken(user: User) {
    this.http.post(this.baseUrl + 'password_reset', user, this.httpOptions)
      .subscribe(
        response => {
          console.log('Richiesta POST riuscita:', response);
          // Gestisci la risposta dal server qui
        },
        error => {
          console.error('Errore durante la richiesta POST:', error);
          // Gestisci l'errore qui
        }
      );
  }

  authenticate(user: User) {
    this.http.post<MyResponse>(this.baseUrl + 'authenticate', user, this.httpOptions)
      .subscribe(
        response => {
          console.log('Richiesta POST riuscita:', response);
          // Gestisci la risposta dal server qui
          console.log(response.jwt)
        },
        error => {
          console.error('Errore durante la richiesta POST:', error);
          // Gestisci l'errore qui
        }
      );
  }
}

interface MyResponse {
  jwt: string
}
