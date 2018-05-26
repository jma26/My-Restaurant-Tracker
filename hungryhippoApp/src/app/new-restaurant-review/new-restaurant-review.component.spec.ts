import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRestaurantReviewComponent } from './new-restaurant-review.component';

describe('NewRestaurantReviewComponent', () => {
  let component: NewRestaurantReviewComponent;
  let fixture: ComponentFixture<NewRestaurantReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRestaurantReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRestaurantReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
