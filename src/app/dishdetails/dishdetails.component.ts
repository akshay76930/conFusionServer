import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {Location} from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { DishService } from '../services/dish.service';
import { Dish } from '../shared/dish';
import {Comment} from '../shared/comment'
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Inject } from '@angular/core';
import { baseURL } from '../shared/baseurl';
import { expand, flyInOut, visibility } from '../animations/app.animation';
@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetails.component.html',
  styleUrls: ['./dishdetails.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      visibility(),
      expand()
    ] 
})
export class DishdetailsComponent implements OnInit {
  @Input()
  dish: Dish;
  errMess:string;
  dishIds: string[];
  prev: string;
  next: string;
  date;
  author:string;
  rating;
  dishcopy:Dish;
  visibility = 'shown';
  myURL
  ='';
 
  pitch;
  commentValues: any[];
  comment: Comment;
  formErrors={
    'author': '',
    'comments': ''
  }

  validationMessages = {
    'author': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 2 characters long.',
      'maxlength':     'Name cannot be more than 25 characters long.'
    },
    'comments': {
      'required':      'Comments are required',
      'minlength':     'Comments must be at least 2 characters long.',
      'maxlength':     'Comments cannot be more than 25 characters long.'
    },
  };
     DISH = {
      id: '0',
      name: 'Uthappizza',
      image: '/assets/images/uthappizza.png',
      category: 'mains',
      featured: true,
      label: 'Hot',
      price: '4.99',
      // tslint:disable-next-line:max-line-length
      description: 'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
      comments: [
           {
               rating: 5,
               comment: 'Imagine all the eatables, living in conFusion!',
               author: 'John Lemon',
               date: '2012-10-16T17:57:28.556094Z'
           },
           {
               rating: 4,
               comment: 'Sends anyone to heaven, I wish I could get my mother-in-law to eat it!',
               author: 'Paul McVites',
               date: '2014-09-05T17:57:28.556094Z'
           },
           {
               rating: 3,
               comment: 'Eat it, just eat it!',
               author: 'Michael Jaikishan',
               date: '2015-02-13T17:57:28.556094Z'
           },
           {
               rating: 4,
               comment: 'Ultimate, Reaching for the stars!',
               author: 'Ringo Starry',
               date: '2013-12-02T17:57:28.556094Z'
           },
           {
               rating: 2,
               comment: 'It\'s your birthday, we\'re gonna party!',
               author: '25 Cent',
               date: '2011-12-02T17:57:28.556094Z'
           }
       ]
    };
  d: Date;
  n: string;
    constructor(private dishservice: DishService, private route: ActivatedRoute,
      private location: Location,
      private fb: FormBuilder,
      @Inject('BASE_URL') baseURL: string) { 
        this.createForm();
        this.commentForm.reset({
          author:'',
          rating:5,
          comment:'',
          date:''
         });
        
      }
  
    ngOnInit() {
      this.myURL=baseURL;
   
      this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
      this.route.params.pipe(
        switchMap((params: Params) =>  { this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']); }))
        .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
          errmess => this.errMess = <any>errmess);
       
    }
    setPrevNext(dishId: string) {
        const index = this.dishIds.indexOf(dishId);
        this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
        this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    }
  
    createForm() {
       this.commentForm = this.fb.group({
        author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
        comment: ['', [Validators.required, Validators.minLength(1)]],
        rating : 5
      });
      this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
      this.onValueChanged();
    }
    onValueChanged(data?: any){
      if(!this.commentForm){return ;}
      const form = this.commentForm;
      for (const field in this.formErrors) {
        if (this.formErrors.hasOwnProperty(field)) {
          this.formErrors[field] = '';
          const control = form.get(field);
          if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[field];
            for (const key in control.errors) {
              if (control.errors.hasOwnProperty(key)) {
                this.formErrors[field] += messages[key] + ' ';
              }
            }
          }
        }
      }
    }
  
    formatLabel(value: number) {
      if (value >= 1000) {
        return Math.round(value / 1000);
      }
      return value;
    }
    commentForm: FormGroup;
    commentData;
    displayValue;

    onSubmitdetails() {
      this.displayValue=true;
      this.commentData = this.commentForm.value;
      console.log(this.commentData)
      this.d= new Date();
      this.n = this.d.toString();
      this.commentForm.value.date = this.n;
        console.log(this.d)    
        this.dishcopy.comments.push(this.comment);
    this.dishservice.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish;
      },
      errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });
    
    }
  }
