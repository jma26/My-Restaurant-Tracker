import { Component, OnInit } from '@angular/core';
import { FacebookService } from './services/facebook.service';

declare var window: any;
declare var FB: any;
declare var name: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLogoutVisible: boolean = false;
  isLoginVisible: boolean = true;
  userLoggedIn: boolean = false;
  isReviewAvailable: boolean = false;

  constructor(private _fbService: FacebookService) {
    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id; js.async = true;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    window.fbAsyncInit = function() {
      FB.init({
          appId      : '177628672915663',
          status     : true,
          cookie     : true,
          xfbml      : true,
          version    : 'v3.0'
      });
      // Subscribe to any status change
      FB.Event.subscribe('auth.statusChange', function(response) {
        console.log(response);
        if (response.authResponse && response.status === 'connected') {
          console.log('Connected to FB');
        }
      })
    }
  }

  ngOnInit() { }


  login() {
    FB.login(function(response) {
      console.log(response);
      if (response.status === 'connected' && response.authResponse) {
        this.userLoggedIn = true;
        let token = response.accessToken;
        FB.api('/me', 'get', {access_token: token, fields: 'name'}, function(response) {
          console.log(response);
          name = response.name;
        })
      }
    })
    // Set user name with fbService
    console.log(name);
    this._fbService.setName(name.name);
  }

  checkCredentials() {
    if (name === "Jesse Ma") {
      this.isReviewAvailable = true;
    } else {
      this.isReviewAvailable = false;
    }
    console.log(name, this.isReviewAvailable);
  }

  logout() {
    FB.logout(function(response) {
      this.userLoggedIn = false;
      alert('You have successfully logged out');
    });
    this.isReviewAvailable = false;
    // Set user name to '' when logged out
    this._fbService.setName('');
  }
}
