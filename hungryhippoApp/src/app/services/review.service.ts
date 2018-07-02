import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ReviewService {

  constructor(private _http: HttpClient) { }

  newReview(newReview) {
    console.log('Review.service.ts pinging ' + newReview);
    return this._http.post('/newreview', newReview);
  }

  newComment(newComment) {
    console.log('Review.service.ts pinging ' + newComment);
    return this._http.put('/newcomment', newComment);
  }

  getReviews() {
    console.log('Review.service.ts pinging- getReviews()');
    return this._http.get('/getreviews');
  }
}
