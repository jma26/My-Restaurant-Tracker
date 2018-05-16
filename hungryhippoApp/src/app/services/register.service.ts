import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RegisterService {

  constructor(private _http: HttpClient) { }

  registerUser(newUser) {
    console.log('Register.service.ts pinging ' + newUser);
    return this._http.post('/registration', newUser);
  }
  
}
