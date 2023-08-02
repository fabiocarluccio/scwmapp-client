import {AfterViewInit, Component, OnInit, ViewChild, ViewRef} from '@angular/core';
import {User} from "../../../models/user";
import {UsersService} from "../../../services/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {

  @ViewChild("userForm") form:any;

  user:User = {} as User;   // questo non è stato usato. Lo tengo solo per appunto
  users: User[] = [];

  showDetails:boolean = true;

  isDisabled:boolean = false;

  currentClass:{} = {}

  constructor(private usersService:UsersService, private route:Router) {
  }

  ngOnInit(): void {
    console.log("Sono nel ngOnInit");
    //this.user.name = "Roberto";
    //this.user.surname = "Vergallo";
    this.user = {
      id: "1",
      username: "Roberto",
      email: "roberto.vergallo@unisalento.it",
      password: "123",
      role: "ADMIN"
      //birthDate: new Date("1983/06/13")
    }

    // subscribe perche sto implementando il pattern observable
    // a tutti gli effetti, questo è un fork
    this.usersService.getUsers().subscribe(
      data => {
        this.users = data;
        console.log(this.users);
      }
    )

    this.currentClass = {
      "btn-primary":!this.isDisabled,
      "big-text":!this.isDisabled
    }

  }

  ngAfterViewInit(): void {
    console.log("Sono nel ngAfterViewInit");
  }

  fireEvent($event: MouseEvent) {
    console.log("Cliccato");
    console.log(event); // questo mi da la descrizione dell'evento
    this.showDetails = !this.showDetails;
  }

  addNewUser() {
     this.users.unshift(this.user);
  }

  onsubmit(userForm: any) {
    console.log(userForm);

    this.user.username = userForm.form.value.username;
    this.user.email = userForm.form.value.email;

    this.usersService.createUser(this.user);
  }

  goToDetail(id: string | undefined) {
    // ... business logic da eseguire prima di far cambiare pagina all'utente
    this.route.navigateByUrl('/about/' + id); // cambio pagina
  }
}
