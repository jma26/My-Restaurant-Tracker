import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

// Services
import { ReviewService } from './services/review.service';
import { AgmCoreModule } from '@agm/core';

// Pipes
import { NoSanitizePipe } from './pipes/no-sanitize.pipe';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NewRestaurantReviewComponent } from './new-restaurant-review/new-restaurant-review.component';
import { AboutComponent } from './about/about.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'newreview', component: NewRestaurantReviewComponent },
  { path: 'about', component: AboutComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NewRestaurantReviewComponent,
    NoSanitizePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCFDzK21ltulX-A1BxEJgUsrYdrYiPf5gw'
    })
  ],
  providers: [ReviewService],
  bootstrap: [AppComponent]
})
export class AppModule { }
