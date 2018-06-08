import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../services/review.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-restaurant-review',
  templateUrl: './new-restaurant-review.component.html',
  styleUrls: ['./new-restaurant-review.component.css']
})
export class NewRestaurantReviewComponent implements OnInit {
  fullname: String;
  selectedFile: File;

  new_review: FormGroup;
  restaurant_name: FormControl;
  lng: FormControl;
  lat: FormControl;
  reviewer: FormControl;
  review: FormControl;
  stars: FormControl;
  image: FormControl;


  constructor(private route: ActivatedRoute, private router: Router, private _reviewService: ReviewService) { }

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
    this.lng = new FormControl("", Validators.required),
    this.lat = new FormControl("", Validators.required),
    this.reviewer = new FormControl(this.fullname, Validators.required),
    this.review = new FormControl("", [Validators.required, Validators.minLength(10)]),
    this.stars = new FormControl(1, Validators.required),
    this.image = new FormControl(null)
  }

  createForm() {
    this.new_review = new FormGroup({
      restaurant_name: this.restaurant_name,
      lng: this.lng,
      lat: this.lat,
      reviewer: this.reviewer,
      review: this.review,
      stars: this.stars,
      image: this.image
    });
  }

  submitReview() {
    if (this.new_review.invalid) {
      console.log('Form unsuccessfully submitted - Invalid fields present');
      console.log(this.new_review.value);
    } else {
      console.log('Form successfully submitted - Valid fields present');
      console.log(this.new_review.value);
      let observable = this._reviewService.newReview(this.new_review.value);
      console.log(this.new_review.value);
      observable.subscribe(data => {
        if (data['error']) {
          console.log(data['error']);
        } else {
          alert('New review successfully added');
          this.router.navigate(['/home', this.fullname]);
        }
      })
    }
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.new_review.get('image').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        });
      }
    }
    console.log(this.new_review);
  }


}
