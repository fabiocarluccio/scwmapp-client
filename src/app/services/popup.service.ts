import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  makeBinPopup(data: any): string {
    return `` +
      `<div><b>${ data.name }</b></div>` +
      `<div>Tipo: ${ data.type }</div>` +
      `<div>Capacità: ${ data.current_capacity }/${ data.total_capacity } kg</div>`
  }
}
