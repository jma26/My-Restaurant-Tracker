import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  markers: any[];
  title = 'RestaurantFive0';
  lat: number = 37.3382082;
  lng: number = -121.8863286;
  
  constructor() { }

  ngOnInit() {
  }

}
