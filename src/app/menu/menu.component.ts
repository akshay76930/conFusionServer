import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Inject } from '@angular/core';
import { baseURL } from '../shared/baseurl';
import { expand, flyInOut } from '../animations/app.animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class MenuComponent implements OnInit {

  dishes: any =[];
  errMess: string;
  myURL="";
  constructor(private dishService: DishService,
    @Inject('BASE_URL') baseURL: string) { }

  ngOnInit() {

    this.myURL=baseURL;
    this.dishService.getDishes().subscribe((dishes)=> this.dishes = dishes,
      errmess => this.errMess = <any>errmess);
       console.log(this.dishes);
  }
}