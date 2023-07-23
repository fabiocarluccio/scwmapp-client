import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // nota che io nel backend non ho reso disponibile il metodo che restituisce gli utenti. Una volta finito questa lezione, modificherò questo progetto per fare in modo che tutto funzioni.
  // (dato che i dao non sono più quelli che ha usato vergallo)
  // TODO in ultimi 10 minuti ha fatto altre cose che per il momento ho skippato
  baseUrl:string = "http://localhost:8080/api/authentication/" // qua andrà messo l'api gateway che andrà poi a collegarsi sui servizi EC2
  users:User[] = []

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':''
    })
  }

  constructor(private http:HttpClient) {
    // TODO il token va preso mediante chiamata API diretta (authentication)
    //

    this.users = [
      {
        id: "1",
        username: "Roberto",
        email: "roberto.vergallo@unisalento.it",
        password: "123",
        role: "ADMIN"
        //birthDate: new Date("1983/06/13")
      },
      {
        id: "2",
        username: "Paolo",
        email: "paolo.bianchi@unisalento.it",
        password: "123",
        role: "ADMIN"
      }
    ]
  }

  // Observable serve per non far freezare il client
  getUsers(): Observable<User[]> {          // GET
    var currentUser = JSON.parse(localStorage.getItem('currentUser')!)
    // a questo punto usiamo currentUser.token e lo usiamo nella chiamata http
    // commentato per il momento perche non voglio testare autenticazione this.httpOptions.headers = this.httpOptions.headers.set('Authorization', 'Bearer '+currentUser.token);

    return this.http.get<User[]>(this.baseUrl+"getall", this.httpOptions);
    //return of(this.users);


  }

  createUser(user:User) { // POST
    this.users.unshift(user);

    //this.http.post(this.baseUrl+"registration", JSON.stringify(user), this.httpOptions);

    // Effettua la richiesta POST
    this.http.post(this.baseUrl + 'registration', user, this.httpOptions)
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
}
