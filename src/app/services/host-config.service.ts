import { Injectable } from '@angular/core';
import {catchError, firstValueFrom, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HostConfigService {

  HOST = 'localhost'

  LOGINMS_PORT = '8080'
  SMARTBINMS_PORT = '8081'
  CITIZENMS_PORT = '8082'
  DISPOSALMS_PORT = '8083'
  ALARMMS_PORT = '8084' // TODO una volta implementato l'allarme
  TAXMS_PORT = '8085'
  RABBITMQ_PORT = '27017' // TODO una volta implementato l'allarme

  LOGINMS_BASEURL = ''
  SMARTBINMS_BASEURL = ''
  CITIZENMS_BASEURL = ''
  DISPOSALMS_BASEURL = ''
  //TODO nonesisteALARMMS_BASEURL = 'http://' + this.HOST + ':' + this.ALARMMS_PORT + '/api/alarm/'
  TAXMS_BASEURL = ''
  TAXCitizenMS_BASEURL = ''



  constructor() { }

  updateEndpoints() {
    this.LOGINMS_BASEURL = 'http://' + this.HOST + ':' + this.LOGINMS_PORT + '/api/authentication/'
    this.SMARTBINMS_BASEURL = 'http://' + this.HOST + ':' + this.SMARTBINMS_PORT + '/api/smartbin/'
    this.CITIZENMS_BASEURL = 'http://' + this.HOST + ':' + this.CITIZENMS_PORT + '/api/citizen/'
    this.DISPOSALMS_BASEURL = 'http://' + this.HOST + ':' + this.DISPOSALMS_PORT + '/api/disposal/'
    //TODO nonesisteALARMMS_BASEURL = 'http://' + this.HOST + ':' + this.ALARMMS_PORT + '/api/alarm/'
    this.TAXMS_BASEURL = 'http://' + this.HOST + ':' + this.TAXMS_PORT + '/api/tax/'
    this.TAXCitizenMS_BASEURL = 'http://' + this.HOST + ':' + this.TAXMS_PORT + '/api/taxStatus/'
  }

}
