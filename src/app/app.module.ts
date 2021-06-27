import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridList, MatGridListModule} from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import { Dish } from './shared/dish';
import { MenuComponent } from './menu/menu.component';
//import { DishdetailComponent } from './dishdetails/dishdetails.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {DishService} from './services/dish.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import {PromotionService} from './services/promotion.service';
import { LeaderService } from './services/leader.service';
import {ProcessHTTPMsgService} from './services/process-httpmsg.service';
import {MatSliderModule} from '@angular/material/slider'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginComponent } from './login/login.component';
import { SliderComponent } from './slider/slider.component';
import { HttpClientModule } from '@angular/common/http';
import { baseURL } from './shared/baseurl';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { BrowserModule } from '@angular/platform-browser';
import { DishdetailsComponent } from './dishdetails/dishdetails.component';

import { HighlightDirective } from './directives/highlight.directive';
//import { Observable } from 'rxjs/Observable';
const DISHES: Dish[] = [

];
  
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
   DishdetailsComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    LoginComponent,
    SliderComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    FlexLayoutModule,
    AppRoutingModule,
    MatCardModule,
    MatFormFieldModule, 
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    FormsModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatButtonModule,
    RestangularModule,
    MatSliderModule,
    ReactiveFormsModule,
    HttpClientModule 

  ],
  providers: [ 
    DishService , 
    PromotionService,
    LeaderService,
    ProcessHTTPMsgService,
    {provide: 'BASE_URL', useValue:baseURL}
  ],
  entryComponents: [
    LoginComponent
],
  bootstrap: [AppComponent]
})
export class AppModule { }
