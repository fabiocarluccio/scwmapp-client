import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Citizen} from "../../../models/citizen";

@Component({
  selector: 'app-citizen-info',
  templateUrl: './citizen-info.component.html',
  styleUrls: ['./citizen-info.component.scss']
})
export class CitizenInfoComponent implements OnInit {

  citizenId: string | null = null
  citizen: Citizen = {} as Citizen

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.citizenId = this.route.snapshot.paramMap.get('citizenId');

    // get citizen data (citizen info + taxes + disposal



    console.log(this.citizenId);
  }
}
