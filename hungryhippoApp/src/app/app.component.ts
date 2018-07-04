import { Component, OnInit } from '@angular/core';
import { FacebookService } from './services/facebook.service';

// Declare window, fb
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
  name: String;

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
          console.log('Hello');
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
          console.log(this.name);
        })
      }
    })
    // Set user name with fbService
    console.log(name);
    this._fbService.setName(name);
  }

  logout() {
    FB.logout(function(response) {
      this.userLoggedIn = false;
      alert('You have successfully logged out');
    });
    // Set user name to '' when logged out
    this._fbService.setName('');
  }
}
