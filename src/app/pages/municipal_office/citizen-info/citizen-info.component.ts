import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-citizen-info',
  templateUrl: './citizen-info.component.html',
  styleUrls: ['./citizen-info.component.scss']
})
export class CitizenInfoComponent implements OnInit {

  citizenId: string | null = null

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.citizenId = this.route.snapshot.paramMap.get('citizenId');

    console.log(this.citizenId);
  }
}
