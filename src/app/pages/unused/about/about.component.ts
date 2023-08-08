import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent  implements OnInit {
  userid: string | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userid = this.route.snapshot.paramMap.get('userid');
    console.log(this.userid);
  }

}

