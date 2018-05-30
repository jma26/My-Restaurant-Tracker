import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-restaurant-review',
  templateUrl: './new-restaurant-review.component.html',
  styleUrls: ['./new-restaurant-review.component.css']
})
export class NewRestaurantReviewComponent implements OnInit {
  fullname: String;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.fullname = params['fullname'];
      console.log(this.fullname);
    })
  }


}
