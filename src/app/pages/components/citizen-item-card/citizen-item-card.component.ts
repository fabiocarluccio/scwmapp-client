import {Component, Input} from '@angular/core';
import {Citizen} from "../../../models/citizen";

@Component({
  selector: 'app-citizen-item-card',
  templateUrl: './citizen-item-card.component.html',
  styleUrls: ['./citizen-item-card.component.scss']
})
export class CitizenItemCardComponent {

  @Input() citizen!: Citizen;


  protected readonly Citizen = Citizen;
}
