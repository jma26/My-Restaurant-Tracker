import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../services/review.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

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
  stars: String;
  base64Image: any;
  bufferImage: any;
  restaurantID: any;

  new_comment: FormGroup;
  comment: FormControl;
  user: FormControl;

  constructor(private route: ActivatedRoute, private router: Router, private _reviewService: ReviewService, private _domSanitizer: DomSanitizer) { };

  ngOnInit() {
    this.markers = [];
    this.getRestaurantReviews();
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.comment = new FormControl("", Validators.required),
    this.user = new FormControl("Jesse", Validators.required);
  }

  createForm() {
    this.new_comment = new FormGroup({
      comment: this.comment,
      name: this.user,
    })
  }

  submitComment() {
    if (this.new_comment.invalid) {
      console.log('Form unsuccessfully submitted - Invalid fields present');
    } else {
      console.log('Form successfully submitted - Valid fields present');
      let observable = this._reviewService.newComment({comment: this.new_comment.value, restaurant: this.restaurantID});
      observable.subscribe(data => {
        if (data['error']) {
          console.log(data['error']);
        } else {
          console.log('Success', data);
        }
      })
    }
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
    this.restaurantID = this.review._id;
    console.log(this.review.review_content[0]._id);
    console.log(this.review.review_content[0].images[0]);
    if (this.previous) {
      this.previous.close();
    }
    this.previous = infowindow;
    this.getStars(this.review);
    this.getImage(this.review.review_content[0].images[0]);
  }

  getStars(review) {
    this.stars = '';
    console.log(review.review_content[0].stars);
    for (let i = 0; i < review.review_content[0].stars; i++) {
      this.stars += "<i class='fas fa-star fa-3x'></i>";
    }
    console.log(this.stars);
  }

  getImage(image) {
    // Check if image exists
    if (image === undefined || image === null) {
      return false;
    }
    // Save buffer image to base64
    this.bufferImage = new Buffer(image.data.data).toString('base64');
    // Sanitize base64 encoded image
    this.base64Image = this._domSanitizer.bypassSecurityTrustUrl(`data:${image.contentType};base64, ${this.bufferImage}`);
    console.log(this.base64Image);
  }

  logout() {
    this.router.navigate(['']);
  }

}
