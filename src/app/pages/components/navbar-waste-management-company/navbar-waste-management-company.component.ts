import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../../models/user";
import {RxStompService} from "../../../stomp/rx-stomp.service";
import {Message} from "@stomp/stompjs";
import {Subscription} from "rxjs";
import {Alarm} from "../../../models/alarm";

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

  alarms: Alarm[] = []


  constructor(private userService:UserService,
              private route:Router,
              private rxStompService: RxStompService) {
  }

  ngOnInit(): void {


    this.topicSubscription = this.rxStompService
      .watch('/topic/capacityAlarm')
      .subscribe((message: Message) => {
        //this.receivedMessages.push(message.body);

        console.log("ricevo mx")
        console.log(message.body)

        // conversione da json in oggetto
        const newAlarm = JSON.parse(message.body) as Alarm


        this.alarms.push(newAlarm)


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
    localStorage.removeItem('userId')
    localStorage.removeItem('wasteTypes')
    localStorage.removeItem('citizen')

    this.route.navigateByUrl('login-page');

  }

  hideBanner(newAlarm: Alarm) {
    // se questo è l'ultimo allarme ricevuto, allora disattiva il banner; altrimenti no
    if (this.alarms[this.alarms.length - 1] == newAlarm) {
      console.log("chiudo il banner")
      this.showBanner = false
    }
    else {
      console.log("lascio aperto il banner")
    }
  }

  /*
    Returns one of 'DANGER', 'WARNING', 'SUCCESS', ''
    Used for assigning color to banner notification.
   */
  getBannerTypology() {
    if (this.alarms.length > 0) {
      return this.alarms[this.alarms.length - 1].messageType
    }
    return ""
  }

}
