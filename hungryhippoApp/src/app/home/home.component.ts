import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../services/review.service';
import { google } from '@agm/core/services/google-maps-types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'RestaurantFive0';
  lat: number = 37.3382082;
  lng: number = -121.8863286;
  zoom: number = 11;
  fullname: String;

  constructor(private route: ActivatedRoute, private router: Router, private _reviewService: ReviewService) {
   }

  ngOnInit() {
    this.getRestaurantReviews();
  }

  getRestaurantReviews() {
    let observable = this._reviewService.getReviews();
    observable.subscribe(data => {
      if (data['error']) {
        console.log(data['error']);
      } else {
        let markers = data;
        console.log(markers);
      }
    })
  }

  logout() {
    this.router.navigate(['']);
  }

}
