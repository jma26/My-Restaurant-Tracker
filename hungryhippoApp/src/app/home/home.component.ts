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
  lat: Number = 37.3382082;
  lng: Number = -121.8863286;
  zoom: Number = 11;
  fullname: String;
  markers: any[];
  review: any = false;
  previous;

  constructor(private route: ActivatedRoute, private router: Router, private _reviewService: ReviewService) {
   }

  ngOnInit() {
    this.markers = [];
    this.getRestaurantReviews();
  }

  getRestaurantReviews() {
    let observable = this._reviewService.getReviews();
    observable.subscribe(data => {
      if (data['error']) {
        console.log(data['error']);
      } else {
        for (let i = 0; i < data['length']; i++) {
          this.markers.push(data[i]);
        }
        console.log(this.markers);
      }
    });
  }

  clickedMarker(infowindow, markerInfo) {
    console.log(infowindow);
    this.review = markerInfo;
    console.log(this.review);
    if (this.previous) {
      this.previous.close();
    }
    this.previous = infowindow;
  }

  logout() {
    this.router.navigate(['']);
  }

}
