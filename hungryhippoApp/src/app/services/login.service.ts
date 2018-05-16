import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {

  constructor(private _http: HttpClient) { }

  loginUser(user) {
    console.log('Login.service.ts pinging ' + user);
    return this._http.post('/login', user);
  }

}
