import { Component, OnInit } from '@angular/core';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';
import { Inject } from '@angular/core';
import { baseURL } from '../shared/baseurl';
import { expand, flyInOut } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  dishErrMess:string;
  promotion: Promotion;
  leader: Leader;
  proerrMess: string;
  leadererrMess: string;

  myURL
  ='';
  constructor(private dishservice: DishService,
  private promotionservice: PromotionService,
  private leaderservice: LeaderService,
  @Inject('BASE_URL') baseURL: string ) { 
}

  ngOnInit() {
    this.myURL=baseURL;
    this.dishservice.getFeaturedDish().subscribe(dish => this.dish = dish,
      errmess=>this.dishErrMess=<any>errmess);
    this.promotionservice.getFeaturedPromotion().subscribe(promotion=>this.promotion=promotion, 
      errmess => this.proerrMess = <any>errmess);
    this.leaderservice.getFeaturedLeader().subscribe(leader => this.leader = leader,
      errmess => this.leadererrMess = <any>errmess);
  }
}