import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  window: any;
  FB: any;

  constructor() {
    // Load SDK asynchronously
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id; js.async = true;;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    window.fbAsyncInit = function() {
      console.log('fbasyncinit');
      FB.init({
          appId      : '177628672915663',
          status     : true,
          cookie     : true,
          xfbml      : true,
          version    : 'v3.0'
      });
    }
  };

  ngOnInit() { }

  loginWithFacebook() {
    FB.login(function(response) {
      if (response.authResponse) {
        console.log(response);
      }
    })
  }

  logout() {
    FB.logout(function(response) {
      console.log(response);
    })
  }
}
