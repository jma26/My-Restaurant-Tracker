import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ReviewService {

  constructor(private _http: HttpClient) { }

  newReview(newReview) {
    console.log('Review.service.ts pinging ' + newReview);
    return this._http.post('/newreview', newReview);
  }
}
