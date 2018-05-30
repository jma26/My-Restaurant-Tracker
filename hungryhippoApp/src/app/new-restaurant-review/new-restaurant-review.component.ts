import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-restaurant-review',
  templateUrl: './new-restaurant-review.component.html',
  styleUrls: ['./new-restaurant-review.component.css']
})
export class NewRestaurantReviewComponent implements OnInit {
  fullname: String;

  new_review: FormGroup;
  restaurant_name: FormControl;
  longitude: FormControl;
  latitude: FormControl;
  reviewer: FormControl;
  review: FormControl;
  stars: FormControl;
  image: FormControl;


  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // Get user name
    this.route.params.subscribe(params => {
      this.fullname = params['fullname'];
      console.log(this.fullname);
    });
    // Run CreateFormControls, createForm Function
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.restaurant_name = new FormControl("", Validators.required),
    this.longitude = new FormControl("", Validators.required),
    this.latitude = new FormControl("", Validators.required),
    this.reviewer = new FormControl("", Validators.required),
    this.review = new FormControl("", [Validators.required, Validators.minLength(10)]),
    this.stars = new FormControl("", Validators.required),
    this.image = new FormControl(null);
  }

  createForm() {
    this.new_review = new FormGroup({
      restaurant_name: this.restaurant_name,
      lng: this.longitude,
      lat: this.latitude,
      reviewer: this.reviewer,
      review: this.review,
      stars: this.stars,
      image: this.image
    });
  }


}
