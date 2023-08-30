import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../../models/user";
import {RxStompService} from "../../../stomp/rx-stomp.service";
import {Message} from "@stomp/stompjs";
import {Subscription} from "rxjs";
import {BinAlarm} from "../../../models/bin-alarm";

@Component({
  selector: 'app-navbar-waste-management-company',
  templateUrl: './navbar-waste-management-company.component.html',
  styleUrls: ['./navbar-waste-management-company.component.scss']
})
export class NavbarWasteManagementCompanyComponent implements OnInit, OnDestroy {
  receivedMessages: string[] = [];
  // @ts-ignore, to suppress warning related to being undefined
  private topicSubscription: Subscription;

  showBanner = false

  binAlarms: BinAlarm[] = []
  binAlarmsNumber = 0

  constructor(private userService:UserService,
              private route:Router,
              private rxStompService: RxStompService) {
    localStorage.setItem('currentRole', "WasteManagementCompany")
  }

  ngOnInit(): void {


    this.topicSubscription = this.rxStompService
      .watch('/topic/alarm')
      .subscribe((message: Message) => {
        //this.receivedMessages.push(message.body);
        console.log("ricevo mx")
        console.log(message.body)

        // conversione da json in oggetto
        const newAlarm = JSON.parse(message.body) as BinAlarm
        this.binAlarmsNumber = newAlarm.binsNumber
        this.binAlarms.push(newAlarm)


        if(this.showBanner) { // caso in cui sia già in mostra il banner
          // forzo il conto alla rovescia in modo che riparta da capo
          this.showBanner = false
          setTimeout(() => {
            this.showBanner = true
          }, 0)
        } else {
          this.showBanner = true
        }


        setTimeout(() => {
          this.hideBanner(newAlarm);
        }, 20000)
      });
  }
  ngOnDestroy() {
    this.topicSubscription.unsubscribe();
  }


  logout() {

    localStorage.removeItem('currentUser')
    localStorage.removeItem('currentRole')
    this.userService.user = {} as User

    this.route.navigateByUrl('login-page');

  }

  hideBanner(newAlarm: BinAlarm) {
    // se questo è l'ultimo allarme ricevuto, allora disattiva il banner; altrimenti no
    if (this.binAlarms[this.binAlarms.length - 1] == newAlarm) {
      console.log("chiudo il banner")
      this.showBanner = false
    }
    else {
      console.log("lascio aperto il banner")
    }
  }

}
