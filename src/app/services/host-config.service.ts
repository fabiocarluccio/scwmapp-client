import { Injectable } from '@angular/core';
import {catchError, firstValueFrom, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HostConfigService {


  PROTOCOL = 'http' // 'https' // 'http'
  HOST = 'localhost'//'nn9im8cie6.execute-api.us-east-1.amazonaws.com/prod' // 'localhost'

  LOGINMS_PORT = ':8080'
  SMARTBINMS_PORT = ':8081'
  CITIZENMS_PORT = ':8082'
  DISPOSALMS_PORT = ':8083'
  //ALARMMS_PORT = '':8084' // TODO configurazione allarme in my-rx-stomp-config.tx
  TAXMS_PORT = ':8085'
  //RABBITMQ_PORT = '':27017' // TODO configurazione allarme in my-rx-stomp-config.tx

  LOGINMS_BASEURL = ''
  SMARTBINMS_BASEURL = ''
  SMARTBINCleaningPathMS_BASEURL = ''
  CITIZENMS_BASEURL = ''
  DISPOSALMS_BASEURL = ''
  TAXMS_BASEURL = ''
  TAXCitizenMS_BASEURL = ''

  constructor() { }

  updateEndpoints() {
    this.LOGINMS_BASEURL = this.PROTOCOL + '://' + this.HOST + this.LOGINMS_PORT + '/api/authentication/'
    this.SMARTBINMS_BASEURL = this.PROTOCOL + '://' + this.HOST + this.SMARTBINMS_PORT + '/api/smartbin/'
    this.SMARTBINCleaningPathMS_BASEURL = this.PROTOCOL + '://' + this.HOST + this.SMARTBINMS_PORT + '/api/cleaningPath/'
    this.CITIZENMS_BASEURL = this.PROTOCOL + '://' + this.HOST + this.CITIZENMS_PORT + '/api/citizen/'
    this.DISPOSALMS_BASEURL = this.PROTOCOL + '://' + this.HOST + this.DISPOSALMS_PORT + '/api/disposal/'
    this.TAXMS_BASEURL = this.PROTOCOL + '://' + this.HOST + this.TAXMS_PORT + '/api/tax/'
    this.TAXCitizenMS_BASEURL = this.PROTOCOL + '://' + this.HOST + this.TAXMS_PORT + '/api/taxStatus/'
  }

}
