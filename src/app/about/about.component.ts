import { Component, Inject, OnInit } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { expand, flyInOut } from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class AboutComponent implements OnInit {
  leaders!: Leader[];
  errMess: any;
  myURL='';
  constructor(private leaderService: LeaderService,@Inject('BASE_URL') baseURL: string) { }

  ngOnInit() {
    this.leaderService.getLeaders()
     .subscribe(leaders => this.leaders = leaders,
      errmess => this.errMess = <any>errmess);
   }
  }
  