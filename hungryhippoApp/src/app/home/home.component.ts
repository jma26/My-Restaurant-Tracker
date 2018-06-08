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
    this.route.params.subscribe(params => {
      this.fullname = params['fullname'];
      console.log(this.fullname);
    })
    this.getRestaurantReviews();
  }

  getRestaurantReviews() {
    let observable = this._reviewService.getReviews();
    observable.subscribe(data => {
      if (data['error']) {
        console.log(data['error']);
      } else {
        console.log(data);
      }
    })
  }

  markers: marker[] = [
    {
      lat: 37.431896,
      lng: -121.903623,
      label: 'Teaspoon',
      draggable: false
    },
    {
      lat: 37.402715,
      lng: -121.933038,
      label: 'Curry Up Now',
      draggable: false
    },
    {
    lat: 37.392646,
    lng: -121.977432,
    label: 'Get Fried Fry Cafe',
    draggable: false
    }
  ]

  logout() {
    this.router.navigate(['']);
  }

}

interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
